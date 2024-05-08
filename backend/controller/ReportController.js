const asyncHandler = require("express-async-handler");
const Donor = require("../models/Donor");
const Cornea = require("../models/Cornea");
const CorneaRequestModel = require("../models/CorneaRequest");
const SampleBlood = require("../models/SampleBlood");
const PhysicalExam = require("../models/PhysicalExam");
const moment = require("moment");

const getDonorCount = asyncHandler(async (req, res) => {
  try {
    const totalDonorsCount = await Donor.estimatedDocumentCount();

      // const count = await Donor.countDocuments();
      // console.log(totalDonorsCount);
    res.status(200).json(totalDonorsCount);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCorneaCount = asyncHandler(async (req, res) => {
  try {
    const totalCorneaCount = await Cornea.estimatedDocumentCount();

      // const count = await Donor.countDocuments();
      // console.log(totalCorneaCount);
    res.status(200).json(totalCorneaCount);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get corneas  for  each month
const getCorneaByMonth = asyncHandler(async (req, res) => {
  try {
    const corneaData = await Cornea.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedCorneaData = corneaData.map((monthData) => {
      const monthName = moment()
        .month(monthData._id - 1)
        .format("MMMM");
      return { month: monthName, count: monthData.count };
    });

    res.status(200).json(formattedCorneaData);
  } catch (error) {
    res.status(500).json(error)
  }
  
});

const getEvalutedCorneaCount = asyncHandler(async (req, res) => {
  try {
    // count aproval corneas 
     const approvedCorneas = await Cornea.countDocuments({
       "evaluation.approval": "yes",
     });
    // console.log(approvedCorneas);
    res.status(200).json(approvedCorneas);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// count request
const getRequestCount = asyncHandler(async (req, res) => {
  try {
    // count aproval corneas 
     const request = await CorneaRequestModel.countDocuments();
    // console.log(approvedCorneas);
    res.status(200).json(request);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// count tested cornea
const getTestedCount = asyncHandler(async (req, res) => {
  try {
    // count aproval corneas 
     const testedCount = await SampleBlood.countDocuments();
    // console.log(approvedCorneas);
    res.status(200).json(testedCount);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// count physical examoned 
const getPhysicalExaminedCount = asyncHandler(async (req, res) => {
  try {
    // count aproval corneas 
     const physicalExaminedCount = await PhysicalExam.countDocuments();
    // console.log(approvedCorneas);
    res.status(200).json(physicalExaminedCount);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getDonorCount,
  getCorneaCount,
  getEvalutedCorneaCount,
  getCorneaByMonth,
};
