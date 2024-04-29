const mongoose = require("mongoose");

const sampleBloodSchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    // isTested: {
    //   type: Boolean,
    //   default: false,
    // },
    tests: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cornId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cornea",
    },
    // dob: Date,
  },
  {
    timestamps: true,
  }
);
const SampleBlood = mongoose.model("SampleBlood", sampleBloodSchema);
module.exports = SampleBlood;
