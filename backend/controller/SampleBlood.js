const SampleBlood = require("../models/SampleBlood");
const asyncHandler = require("express-async-handler");

const createSampleBlood = asyncHandler(async (req, res) => {
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
        }
    } catch (error) {
        throw error;
    }
})
module.exports = { createSampleBlood }