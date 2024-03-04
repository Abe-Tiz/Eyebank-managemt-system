const mongoose = require("mongoose");

// high risk examined for donor 
const examinedSchema = new mongoose.Schema({
    head: { type: Boolean, default: false },
    mouth: { type: Boolean, default: false },
    neck: { type: Boolean, default: false },
    arms: { type: Boolean, default: false },
    abdomen: { type: Boolean, default: false },
    genitals: { type: Boolean, default: false },
    arteries: { type: Boolean, default: false },
    back: { type: Boolean, default: false },
});

// risk  examined for the donor
const riskExaminedSchema = new mongoose.Schema({
    sexual: { type: String, enum: ["no evidence", "evidence"] },
    analInterCourse: { type: String, enum: ["no evidence", "evidence"] },
    NonMedical: { type: String, enum: ["no evidence", "evidence"] },
    oralThrush: { type: String, enum: ["no evidence", "evidence"] },
    Blue: { type: String, enum: ["no evidence", "evidence"] },
    enlargedLiver: { type: String, enum: ["no evidence", "evidence"] },
});

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
        dod: {
            type: Date,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        isRefrigerated: {
            type: Boolean,
            default: false,
        },
        examined: [examinedSchema],
        highRiskexamined: [riskExaminedSchema],
        causeOfDeath: String,
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
