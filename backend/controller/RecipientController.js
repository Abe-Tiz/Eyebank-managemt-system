const RecipientModel = require('../models/Recipient');
const HospitalModel = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const createRecipient = async (req, res) => {
    const { recipientname, sex, age, phone, registerDate, surgeonName, surgeryType, hospital, address } = req.body;
    try {
        const recipient = await RecipientModel.create({
            recipientname: recipientname, phone: phone, address: address, surgeryType: surgeryType, sex: sex, age: age, registerDate: registerDate, surgeonName: surgeonName, hospital: hospital
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
    // .populate({
    //     path: 'nameOfSurgeon',
    //     select: 'name'
    // })
    // .populate({
    //     path: 'hospital',
    //     select: 'hospitalName address'
    // })
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
const ocularPost = async (req, res) => {
    try {
        const recipient = await RecipientModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.send(recipient);
    }
    catch (error) {
        throw error;
    }

}
const adverseReaction = async (req, res) => {
    try {
        const recipient = await RecipientModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.send(recipient);
    }
    catch (error) {
        throw error;
    }
}
module.exports = {
    createRecipient,
    getRecipients,
    getRecipient,
    updateRecipient,
<<<<<<< HEAD
    deleteRecipient
}
=======
    deleteRecipient,
    ocularPost,
    adverseReaction
}
>>>>>>> 265a67e584919b909806dfc7d0611f1a4c050ef8
