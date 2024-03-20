const Accident = require('../models/Accident');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const CreateAccident = asyncHandler(async (req, res) => {
    const { doctorName, errorType, category } = req.body;
    try {
        const accident = await Accident.create({
            doctorName: doctorName,
            erroType: errorType,
            category: category
        })
        if (accident) {
            res.send({ status: "ok", data: accident })
        }
    } catch (error) {
        throw error;
    }
})

module.exports = { CreateAccident }