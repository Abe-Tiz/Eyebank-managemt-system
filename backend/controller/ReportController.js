const asyncHandler = require("express-async-handler");
const Donor = require("../models/Donor");

const getDonorCount = asyncHandler(async (req, res) => {
  try {
    const totalDonorsCount = await Donor.estimatedDocumentCount();

      // const count = await Donor.countDocuments();
      console.log(totalDonorsCount);
    res.status(200).json(totalDonorsCount);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {getDonorCount }
