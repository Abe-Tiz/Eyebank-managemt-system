const mongoose = require("mongoose");
const DistributionSchema = new mongoose.Schema({
    LotNo: {
        type: String,
        //required: true,
    },
    hospitalName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    nameOfSurgeon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    modeOfTransportation: {
        type: String,
        //required: true,
    },
    typeOfTissue: {
        type: String
    },

    approvedBy: {
        type: String
    },
    nameOfTechnician: {
        type: String
    }

}, {
    timestamps: true
}
)

const Distribution = mongoose.model('Distribution', DistributionSchema);
module.exports = Distribution