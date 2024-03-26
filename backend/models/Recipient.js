const mongoose = require("mongoose");
const RecipientSchema = new mongoose.Schema({
    recipinentname: {
        type: String,
        // required: true,
    },
    recipinentId: {
        type: String,
        //required: true,
    },
    age: {
        type: Number,
        //required: true,
    },
    sex: {
        type: String,
        //required: true,
    },
    diagnosis: {
        type: String,
        //required: true,
    },
    phone: {
        type: String,
        //required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        //required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    ocularPost: {

    },
    adverseReaction: {

    }
},
    {
        timestamps: true
    }
)

const Recipient = mongoose.model("Recipient", RecipientSchema)
module.exports = Recipient