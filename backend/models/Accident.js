const mongoose = require("mongoose");
const AccidentSchema = new mongoose.Schema({
    doctorName: {
        type: String,
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
})
const Accident = mongoose.model('Accident', AccidentSchema);
module.exports = Accident