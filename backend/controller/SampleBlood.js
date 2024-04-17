const SampleBlood = require("../models/SampleBlood");
const asyncHandler = require("express-async-handler");

const createSampleBlood = asyncHandler(async (req, res) => {
    const { donorId, technicianName, serologyResult, bloodId } = req.body;
    try {
        const sampleBlood = await SampleBlood.create({
            bloodId: bloodId,
            donorId: donorId,
            technicianName: technicianName,
            serologyResult: serologyResult
        });
        if (sampleBlood) {
            res.send({ status: "ok", data: sampleBlood });
        }
    } catch (error) {
        throw error;
    }
});
module.exports = { createSampleBlood };