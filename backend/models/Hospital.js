const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})
const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital