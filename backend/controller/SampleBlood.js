const Cornea = require("../models/Cornea");
const SampleBlood = require("../models/SampleBlood");
const asyncHandler = require("express-async-handler");

const createSampleBlood = asyncHandler(async (req, res) => {
    const serology = req.body;
    const id = req.body.cornId;
    
   
    try {
      const sampleBlood = await SampleBlood.create(serology);
      const cornea = await Cornea.findById(id); // Use findById instead of find

      console.log("before cornea:", cornea);

      cornea.isTested = true;
        await cornea.save();
        // console.log("after cornea:", cornea);
      res.status(200).json(sampleBlood);
    } catch (error) {
        res.status(500).json(error)
    }
})

const getSerologyTest = async (req, res) => {
    try {
        const serology = await SampleBlood.find({})
            .populate("userId", "name email"); 
        res.status(200).json(serology);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteSerology = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await SampleBlood.deleteOne(
            { _id: id },
            { new: true }
        );
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        // console.log(error);
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
};