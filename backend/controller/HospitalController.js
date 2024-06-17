const HospitalModel = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const CreatHospital = async (req, res) => {

    const response = req.body;
    try {
        const hospital = await HospitalModel.create(response);
        if (hospital) {
            res.status(200).json({ hospital });
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

const getHospitalByName = asyncHandler(async (req, res) => {
    try {
        const { hospitalName } = req.body;
        const response = await HospitalModel.find(
            { hospitalName: { $regex: new RegExp(`^${hospitalName}`, "i") } }
        ).exec();

        if (response.length === 0) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const UpdateHospital = async (req, res) => {
    const hospital = await HospitalModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.send(hospital);
}
const DeleteHospital = async (req, res) => {
    await HospitalModel.findByIdAndDelete(req.params.id, {
         new:true
     });
    res.send("deleted successfully");
}
module.exports = {
    CreatHospital,
    GetHospital,
    GetHospitalById,
    UpdateHospital,
    DeleteHospital,
    getHospitalByName,
};