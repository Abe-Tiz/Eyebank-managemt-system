const mongoose = require("mongoose");

const sampleBloodSchema = new mongoose.Schema({
    bloodType:{
        type: String,
        required: true,
    },
    Donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Donor",
        required: true,
    },
    testingStatus:{
        type: String,
        required: false,
    },
    testingResult:{
        type: String,
    },
    technicianName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    }
})
const SampleBlood = mongoose.model("SampleBlood", sampleBloodSchema);
module.exports=SampleBlood;