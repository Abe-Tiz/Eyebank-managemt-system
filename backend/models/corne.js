const mongoose = require("mongoose");
const corneaSchema = new mongoose.Schema({
    DonorId: {
        type: String,

    },
    nameOfSurgeon: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now,
    },
    Position: {
        type: String,
        enum: ["Left", "Right"],

    },
    EyeLid: {
        type: String,

    },
    size: {
        type: Number,
    },
    IrisColor: {
        type: String,
    },
    CorneaStatus: {
        type: Boolean,

    },
    Clarity: {
        type: String,
    },

    LensColor: {
        type: String,
    },



});
const Cornea = mongoose.model("Corne", corneaSchema);
module.exports = Cornea;