const mongoose = require("mongoose");
const AccidentSchema = new mongoose.Schema({
    surgeonName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
    errorType: {
        type: String,
        //required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    receipentName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipient",
        // required: true,
    },
    hospitalName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
        // required: true,
    },
}, {
    timestamps: true
}

)
const Accident = mongoose.model('Accident', AccidentSchema);
module.exports = Accident