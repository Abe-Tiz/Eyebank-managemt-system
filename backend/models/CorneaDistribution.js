const mongoose = require("mongoose");
const DistributionSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modeOfTransportation: {
      type: String,
      //required: true,
    },
    corneaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cornea",
    },
  },
  {
    timestamps: true,
  }
);

const Distribution = mongoose.model('Distribution', DistributionSchema);
module.exports = Distribution