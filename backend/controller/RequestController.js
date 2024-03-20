const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

const createRequest = asyncHandler(async (req, res) => {
    const { surgoenName, email, phone, message, hospitalName, hospitalAddress } =
        req.body;
    try {
        const request = await Request.create({
            surgoenName: surgoenName,
            email: email,
            phone: phone,
            message: message,
            hospitalName: hospitalName,
            hospitalAddress: hospitalAddress,
        });
        if (request) {
            res.status(200).json({ request });
        }
    } catch (error) {
        throw error;
    }
});
module.exports = { createRequest }