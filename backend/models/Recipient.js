const mongoose = require("mongoose");
const RecipientSchema = new mongoose.Schema({
    recipientname: {
        type: String,
        // required: true,
    },
    age: {
        type: Number,
        //required: true,
    },
    sex: {
        type: String,
        //required: true,
    },
    phone: {
        type: String,
        //required: true,
    },
    address: {
        type: String,
    },
    surgeryType: {
        type: String
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        //required: true,
    },
    surgeonName: {
        type: String
    },

    ocularPost: {
        ocularPost: {
            type: Boolean,
            default: false
        },
        dateOfSurgry: {
            type: Date,
            default: Date.now
        },
        surgeryType: {
            type: String
        },
        ocularOperativeEye: {
            type: String
        },
        ocularNonOperativeEye: {
            type: String
        }
    },
    adverse: {
        adversePost: {
            type: Boolean,
            default: false
        },
        dateOfadverse: {
            type: Date,
            default: Date.now
        },
        adverseReaction: {
            type: String
        },
        probablityCase: {
            type: String
        },
        donorTissue: {
            type: String
        },

    },
},
    {
        timestamps: true
    }
)
const Recipient = mongoose.model("Recipient", RecipientSchema)
module.exports = Recipient
