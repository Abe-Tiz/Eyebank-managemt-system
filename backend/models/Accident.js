const mongoose = require("mongoose");
const AccidentSchema = new mongoose.Schema({
    doctorName: {
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
}, {
    timestamps: true
}

)
const Accident = mongoose.model('Accident', AccidentSchema);
module.exports = Accident