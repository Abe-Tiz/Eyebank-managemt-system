  const mongoose = require("mongoose");

  const sampleBloodSchema = new mongoose.Schema(
    {
      bloodType: {
        type: String,
      },
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
      reason: {
        type:String
      },
    },
    {
      timestamps: true,
    }
  );
  const SampleBlood = mongoose.model("SampleBlood", sampleBloodSchema);
  module.exports = SampleBlood;
