const mongoose = require("mongoose");
const RecipientSchema = new mongoose.Schema({
    recipientname: {
        type: String,
        // required: true,
    },
    recipinentId: {
        type: String,
        //required: true,
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
    surgeonType: {
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
    ocularPost: {
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
        dateOfadverse: {
            type: Date,
            default: Date.now
        },
        advererReaction: {
            type: String
        },
        probablityCase: {
            type: String
        },
        donorTissue: {
            type: String
        },
        patient: {
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
