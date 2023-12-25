const Contact = require('../models/Contact');
const asyncHandler = require("express-async-handler");
const CreateContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        const contact = await Contact.create({
            name: name, email: email, phone: phone, message: message
        })
        if (contact) {
            res.status(200).json({ contact })
        }
    } catch (error) {
        throw error;
    }
})
module.exports = { CreateContact };