const RecipientModel = require('../models/Recipient');
const HospitalModel = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const createRecipient = async (req, res) => {
    const { recipinentname, recipinentId, age, registratioDate, diagnosis, surgeonName, hospital } = req.body;
    try {
        const recipient = await RecipientModel.create({
            recipinentname: recipinentname, recipinentId: recipinentId, age: age, registratioDate: registratioDate, diagnosis: diagnosis, surgeonName: surgeonName, hospital: hospital
        })
        if (recipient) {
            res.status(200).json({ recipient })
        }
    } catch (error) {
        throw error;
    }
}
const getRecipients = async (req, res) => {
    // const hospital = await HospitalModel.findById(req.hospital)
    // res.send(hospital);
    const recipient = await RecipientModel.find()
        .populate({
            path: 'surgeonName',
            select: 'name'
        })
        .populate({
            path: 'hospital',
            select: 'hospitalName address'
        })
    res.send(recipient);
}
const getRecipient = async (req, res) => {
    const recipient = await RecipientModel.findById(req.params.id);
    res.send(recipient);
}
const updateRecipient = async (req, res) => {
    const recipient = await RecipientModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(recipient);
}
const deleteRecipient = async (req, res) => {
    const recipient = await RecipientModel.findByIdAndDelete(req.params.id);
    res.send(recipient);
}
module.exports = {
    createRecipient,
    getRecipients,
    getRecipient,
    updateRecipient,
    deleteRecipient
}