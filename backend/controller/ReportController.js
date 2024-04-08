const asyncHandler = require("express-async-handler");
const Donor = require("../models/Donor");
const Cornea = require("../models/Cornea");

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

module.exports = { getDonorCount, getCorneaCount, getEvalutedCorneaCount };
