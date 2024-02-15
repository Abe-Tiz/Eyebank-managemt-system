 const mongoose = require("mongoose");

 const storedCorneaSchema = new mongoose.Schema(
   {
        isEvaluted: {
            type: Boolean,
            default: false,
            required: true,
        },
        isDistributed: {
            type: Boolean,
            default: false,
            required: true,
            },
        ExpirDate:Date,
        isExpired: {
            type: Boolean,
            default: false,
            required: true,
            },
        PreservedDate: Date,
        DOD: Date,
        age: String,
        sex: String,
        CorneaStatus: Boolean,
      
     }
 );

    const StoredCornea =
      mongoose.models.StoredCornea ||
      mongoose.model("StoredCornea", storedCorneaSchema);

 module.exports = StoredCornea;
