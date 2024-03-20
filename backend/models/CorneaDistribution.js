const mongoose = require("mongoose");
const DistributionSchema = new mongoose.Schema({
    LotNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cornea"
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
    processingFee: {
        type: Number
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nameOfTechnician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
}
)

const Distribution = mongoose.model('Distribution', DistributionSchema);
module.exports = Distribution