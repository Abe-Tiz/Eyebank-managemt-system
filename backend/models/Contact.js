const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    message: { type: String, required: true },
},
    {
        timestamps: true
    }
)
const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;