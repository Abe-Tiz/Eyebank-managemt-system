const mongoose = require("mongoose");

// donor schema
const donorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        subcity: {
            type: String,
            required: true,
        },
        kebele: {
            type: String,
            required: true,
        },
        HNumber: {
            type: Number,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verificationToken: String,
    },
    {
        timestamps: true,
    }
);

const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);

module.exports = Donor;
