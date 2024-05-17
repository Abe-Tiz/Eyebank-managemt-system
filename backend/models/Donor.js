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
    dob: {
      type: Date,
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
    isVolunter: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationCode: {
      type: String,
    },
    donate:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);

module.exports = Donor;
