const SampleBlood = require("../models/SampleBlood");
const asyncHandler = require("express-async-handler");

const createSampleBlood = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const { donorId, techenicianName, serologyResult, bloodId } = req.body;
    try {
        const sampleBlood = await SampleBlood.create({
            bloodId: bloodId,
            donorId: donorId,
            techenicianName: techenicianName,
            serologyResult: serologyResult
        })
        if (sampleBlood) {
            res.send({ status: "ok", data: sampleBlood })
=======
    const serology  = req.body;
    try {
        const sampleBlood = await SampleBlood.create(serology);
        if (sampleBlood) {
            sampleBlood.isTested = true;
            sampleBlood.save();
            res.status(200).json(sampleBlood)
>>>>>>> 005e14fd49773251350fff56c26f5f273abbeb6b
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
<<<<<<< HEAD
module.exports = { createSampleBlood }
=======

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
>>>>>>> 005e14fd49773251350fff56c26f5f273abbeb6b
