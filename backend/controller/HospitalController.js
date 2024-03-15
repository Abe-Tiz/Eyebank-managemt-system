const HospitalModel = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const CreatHospital = async (req, res) => {

    const { hospitalName, hospitalId, hospitalType, address } = req.body;
    try {
        const hospital = await HospitalModel.create({
            hospitalName: hospitalName, hospitalId: hospitalId, hospitalType: hospitalType, address: address
        })
        if (hospital) {
            res.status(200).json({ hospital })
        }
    } catch (error) {
        throw error;
    }

}
const GetHospital = async (req, res) => {
    const hospital = await HospitalModel.find();
    res.send(hospital);
}
const GetHospitalById = async (req, res) => {
    const hospital = await HospitalModel.findById(req.params.id);
    res.send(hospital);
}
const UpdateHospital = async (req, res) => {
    const hospital = await HospitalModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(hospital);
}
const DeleteHospital = async (req, res) => {
    const hospital = await HospitalModel.findByIdAndDelete(req.params.id);
    res.send(hospital);
}
module.exports = { CreatHospital, GetHospital, GetHospitalById, UpdateHospital, DeleteHospital }