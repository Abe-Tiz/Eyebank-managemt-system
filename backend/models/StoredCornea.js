const mongoose = require("mongoose");

const storedCorneaSchema = new mongoose.Schema({
  LotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cornea",
    required: true,
  },
  // isEvaluated: {
  //   type: Boolean,
  //   default: false,
  //   required: true,
  // },
  isDistributed: {
    type: Boolean,
    default: false,
    required: true,
  },
  ExpiryDate: Date,
  PreservedDate: Date,
  DOD: Date,
  age: String,
  sex: String,
  CorneaStatus: Boolean,
});

const StoredCornea =
  mongoose.models.StoredCornea ||
  mongoose.model("StoredCornea", storedCorneaSchema);

module.exports = StoredCornea;
