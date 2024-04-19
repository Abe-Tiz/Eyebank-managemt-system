const mongoose = require("mongoose");

const sampleBloodSchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    isTested: {
      type: Boolean,
      default: false,
    },
    tests: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhysicalExam",
    },
    dob: Date,
  },
  {
    timestamps: true,
  }
);
const SampleBlood = mongoose.model("SampleBlood", sampleBloodSchema);
module.exports = SampleBlood;
