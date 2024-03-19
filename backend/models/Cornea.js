const mongoose = require('mongoose');

const corneaSchema = new mongoose.Schema({

    recoveryTechnical: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    position: {
        type: String, enum: ['left', 'right']
    },
    eyeLid: {
        type: String,
    },
    size: {
        type: Number,
    },
    irisColor: {
        type: String,
    },
    corneaStatus: {
        type: String,
        // default: false
    },
    clarity: {
        type: String,
    },
    lens: {
        type: String,
    },
    evaluation: {
        evaluationDate: {
            type: Date,
        },
        epitheliam: {
            type: String,
        },
        stroma: {
            type: String,
        },
        endothelium: {
            type: String,
        },

        evaluater: {
            type: String
        },
        evaluationComment: {
            type: String
        },
        approval: {
            type: String,
            enum: ['yes', 'no']
        },
        suiatablity: {
            type: String,
            enum: ['PK', 'EK', 'ALK', 'KLA', 'K-Pro', 'Therapeutic']
        },
        reason: {
            type: String,
            enum: ['epitheliam', 'stroma', 'endothelium', 'descement', 'other']
        }

    }

},


    { timestamps: true }
);
const Cornea = mongoose.model('Cornea', corneaSchema);
module.exports = Cornea
