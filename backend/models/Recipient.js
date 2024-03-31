const mongoose = require("mongoose");
const RecipientSchema = new mongoose.Schema({
    recipinentname: {
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

    registerDate: {
        type: Date,
        default: Date.now
    },
    ocularPost: {
        lotNo: {
            type: String
        },
        surgeonName: {
            type: String
        },
        dateOfSurgry: {
            type: Date

        },
        surgeryType: {
            type: String
        },
        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            //required: true,
        },
        ocularOperativeEye: {
            type: String
        },
        ocularNonOperativeEye: {
            type: String
        }

    },
    adverseReaction: {

        dateOfDiagnosis: {
            type: Date
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
        }

    },
},
    {
        timestamps: true
    }
)

const Recipient = mongoose.model("Recipient", RecipientSchema)
module.exports = Recipient
