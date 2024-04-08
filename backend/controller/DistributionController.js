const Distribution = require('../models/CorneaDistribution');
const createDistribution = async (req, res) => {
    const { hospitalName, nameOfSurgeon, modeOfTransportation, typeOfTissue, approvedBy, nameOfTechnician, LotNo } = req.body;
    try {
        const distribution = await Distribution.create({
            LotNo: LotNo,
            hospitalName: hospitalName,
            nameOfSurgeon: nameOfSurgeon,
            modeOfTransportation: modeOfTransportation,
            typeOfTissue: typeOfTissue,

            approvedBy: approvedBy,
            nameOfTechnician: nameOfTechnician
        })
        if (distribution) {
            res.send({ status: "ok", data: distribution })
        }
    } catch (error) {
        throw error;
    }
}
const getDistributeds = async (req, res) => {
    const distribute = await Distribution.find()
        .populate({
            path: "LotNo",
            select: "_id"
        })
        .populate({
            path: "hospitalName",
            select: "hospitalName"
        })
        .populate({
            path: 'nameOfSurgeon',
            select: 'name'
        })
        .populate({
            path: 'approvedBy',
            select: 'name'
        })
        .populate({
            path: 'nameOfTechnician',
            select: 'name'
        })
    res.send(distribute);
};

const getDistributed = async (req, res) => {
    const distribute = await Distribution.findById(req.params.id);
    res.send(distribute);
};
const editDistributed = async (req, res) => {
    const distribute = await Distribution.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(distribute);
};
const deleteDistributed = async (req, res) => {
    try {
        const { id } = req.params;
        // Assuming you have a Donor model
        await Distribution.deleteOne({ _id: id }); // Assuming the donor ID is stored in the "_id" field
        res.status(200).json({ message: "distribution  deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createDistribution, getDistributeds, getDistributed, editDistributed, deleteDistributed }