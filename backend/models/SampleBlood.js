const mongoose = require("mongoose");

const sampleBloodSchema = new mongoose.Schema({
    bloodId: {
        type: String
        //required: true,
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "physicalExam",
        //required: true,
    },
    techenicianName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
    serologyResult: {
        type: String,
        //required: true,
    }
},
    {
        timestamps: true
    }
);

const SampleBlood = mongoose.model('SampleBlood', sampleBloodSchema);
module.exports = SampleBlood