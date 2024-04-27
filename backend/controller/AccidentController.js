const Accident = require('../models/Accident');
const User = require('../models/User');
const Recipient = require('../models/Recipient');
const Hospital = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const CreateAccident = asyncHandler(async (req, res) => {
    const { category, surgeonName, errorType, receipentName, hospitalName } = req.body;
    try {
        const accident = await Accident.create({
            category: category,
            errorType: errorType,
            surgeonName: surgeonName,
            receipentName: receipentName,
            hospitalName: hospitalName

        })
        if (accident) {
            res.send({ status: "ok", data: accident })
        }
    } catch (error) {
        throw error;
    }
})

const getAccident = async (req, res) => {
    const accident = await Accident.find()

        .populate({
            path: "hospitalName",
            select: "hospitalName"
        })
        .populate({
            path: 'surgeonName',
            select: 'name'
        })
        .populate({
            path: 'receipentName',
            select: 'name'
        })

    res.send(accident);
};

const getOneAccident = async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    res.send(accident);
};
const editAccident = async (req, res) => {
    const accident = await Accident.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(accident);
};
const deleteAccident = async (req, res) => {
    try {
        const { id } = req.params;
        await Accident.deleteOne({ _id: id });
        res.status(200).json({ message: "Accident  deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { CreateAccident, getAccident, getOneAccident, editAccident, deleteAccident }