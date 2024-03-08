const mongoose = require('mongoose');

const corneaSchema = new mongoose.Schema({

    recoveryTechnical: {
        type: String
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
            enum: ['positive', 'negative']
        }
    },

},
    { timestamps: true }
);
const Cornea = mongoose.model('Cornea', corneaSchema);
module.exports = Cornea
