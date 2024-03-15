const mongoose = require("mongoose");

const corneaRequestSchema = new mongoose.Schema({
  surgeonName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospitalName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  hospitalLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    default: true,
  },
});
const CorneaRequest = mongoose.model("CorneaRequest", corneaRequestSchema);
module.exports = CorneaRequest;
