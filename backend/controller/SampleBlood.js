const Cornea = require("../models/Cornea");
const SampleBlood = require("../models/SampleBlood");
const asyncHandler = require("express-async-handler");

const createSampleBlood = asyncHandler(async (req, res) => {
    const serology = req.body;
    const id = req.body.cornId;
    try {
        const sampleBlood = await SampleBlood.create(serology);
        const cornea = await Cornea.findById(id);  
        cornea.isTested = true;
        await cornea.save();
        res.status(200).json(sampleBlood);
    } catch (error) {
        res.status(500).json(error)
    }
})

const getSerologyTest = async (req, res) => {
    try {
        const serology = await SampleBlood.find({})
          .populate({ path: "userId", select: "name email" })
          .populate({
            path: "cornId",
            select: "lotNo position corneaStatus eyeLid",
          }); 
        res.status(200).json(serology);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSampleByLotnum = async (req, res) => {
  try {
    const { lotNo } = req.body;
      const cornea = await SampleBlood.find({})
        .populate({ path: "userId", select: "name email" })
        .populate({
          path: "cornId",
          match: {
            lotNo: { $regex: new RegExp(`^${lotNo}`, "i") },
          },
          select: "lotNo position corneaStatus eyeLid",
        })
        .exec();

    const filteredSamples = cornea.filter((sample) => sample.cornId !== null);

    if (filteredSamples.length === 0) {
      return res.status(404).json({ message: "Sample Blood not found" });
    }

    res.status(200).json(filteredSamples);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteSerology = async (req, res) => {
    try {
        const {id} = req.params;
         await SampleBlood.deleteOne(
            { _id: id },
            { new: true }
      );
    
      res.status(200).json("deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateSerology = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await SampleBlood.findByIdAndUpdate(id, req.body, { new: true });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
 }

module.exports = {
    createSampleBlood,
    getSerologyTest,
    deleteSerology,
    updateSerology,
    getSampleByLotnum,
};