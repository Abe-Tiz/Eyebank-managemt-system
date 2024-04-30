const mongoose = require("mongoose");
const DistributionSchema = new mongoose.Schema({
  
    hospitalName: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required: true
    },
    modeOfTransportation: {
        type: String,
        //required: true,
    },
    suiatablity: {
        type: String,
        //required: true,
    },
 
}, {
    timestamps: true
}
)

const Distribution = mongoose.model('Distribution', DistributionSchema);
module.exports = Distribution