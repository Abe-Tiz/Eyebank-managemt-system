const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    surgoenName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    hospitalName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        //required: true,
    },
    hospitalAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        //required: true,
    },
},
    {
        timestamps: true
    }
);
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;