const asyncHandler = require("express-async-handler");
const Donor = require("../models/Donor");
const Cornea = require("../models/Cornea");
const User = require("../models/User");
const CorneaRequestModel = require("../models/CorneaRequest");
const RecipientModel = require("../models/Recipient");
const SampleBlood = require("../models/SampleBlood");
const PhysicalExam = require("../models/PhysicalExam");
const StoredCornea = require("../models/StoredCornea");
const moment = require("moment");
const Distribution = require("../models/CorneaDistribution");
// const RecipientModel = require("../models/Recipient");

// get total number of pledged
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
// get total number of Active Users
const getUserCount = asyncHandler(async (req, res) => {
    try {
        const totalUsersCount = await User.estimatedDocumentCount();
        res.status(200).json(totalUsersCount);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get total number of cornea
const getCorneaCount = asyncHandler(async (req, res) => {
    try {
        const totalCorneaCount = await Cornea.estimatedDocumentCount();
        res.status(200).json(totalCorneaCount);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// get total number of stored cornea
const getStoredCorneaCount = asyncHandler(async (req, res) => {
    try {
        const stored = await Cornea.estimatedDocumentCount({
            distributed: true,
            expirationDate: { $lt: 14 },
        });
        res.status(200).json(stored);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get pledged  for  each month
const getPledgeByMonth = asyncHandler(async (req, res) => {
    try {
        const corneaData = await Donor.aggregate([
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

// corneas with in month
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

// transplanted corneas with in month
const getTransplantedCorneaByMonth = asyncHandler(async (req, res) => {
    try {
        const corneaData = await RecipientModel.aggregate([
          {
            $project: {
              month: { $month: "$createdAt" },
              "ocularPost.Post": 1,
            },
          },
          {
            $match: { "ocularPost.Post": true },
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

// get total evaluted cornea
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

// total transplanted corneas
const getTransplantedCorneaCount = asyncHandler(async (req, res) => {
    try {
        const respo = await RecipientModel.countDocuments({
            "ocularPost.Post": true,
        });
        res.status(200).json(respo);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get total distributed cornea
const getDistributedCorneaCount = asyncHandler(async (req, res) => {
    try {
        const distrbutedCorneas = await Distribution.countDocuments({});
        res.status(200).json(distrbutedCorneas);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get distributed cornea in month
const getDistributedCorneaByMonth = asyncHandler(async (req, res) => {
    try {
        const corneaData = await Distribution.aggregate([
            // {
            //   $match: { isDistributed: true },
            // },
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
        res.status(500).json(error);
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

const getRequesCount = asyncHandler(async (req, res) => {
    try {
        const totalCount = await CorneaRequestModel.estimatedDocumentCount({ isApproved: true });

        // const count = await Donor.countDocuments();
        // console.log(totalDonorsCount);
        res.status(200).json(totalCount);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getOcularPost = asyncHandler(async (req, res) => {
    try {
        const totalCount = await RecipientModel.estimatedDocumentCount({ Post: true });

        // const count = await Donor.countDocuments();
        // console.log(totalDonorsCount);
        res.status(200).json(totalCount);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getAdverseReaction = asyncHandler(async (req, res) => {
    try {
        const totalCount = await RecipientModel.estimatedDocumentCount({ adversePost: true });

        // const count = await Donor.countDocuments();
        // console.log(totalDonorsCount);
        res.status(200).json(totalCount);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const getDiscarded = asyncHandler(async (req, res) => {
    try {
        // count aproval corneas 
        const approvedCorneas = await Cornea.countDocuments({
            "evaluation.approval": "no",
        });
        // console.log(approvedCorneas);
        res.status(200).json(approvedCorneas);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// exports the modules
module.exports = {
  getDonorCount,
  getCorneaCount,
  getEvalutedCorneaCount,
  getCorneaByMonth,
  getTestedCount,
  getPhysicalExaminedCount,
  getDistributedCorneaCount,
  getDistributedCorneaByMonth,
  getPledgeByMonth,
  getUserCount,
    getRequesCount,
    getOcularPost,
    getAdverseReaction,
    getDiscarded,
  getStoredCorneaCount,
  getTransplantedCorneaByMonth,
  getTransplantedCorneaCount,
};