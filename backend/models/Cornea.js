const mongoose = require('mongoose');

const evaluatioSchema = new mongoose.Schema({

    evaluation: {
        epitheliam: {
            type: String,
        },
        dateofEvaluation: {
            type: Date,
        },
        stroma: {
            type: String,
        },
        endothelium: {
            type: String,
        },
        approval: {
            type: Boolean,
            default: false
        },
        evaluater: {
            type: String
        },

    }
});
const corneaSchema = new mongoose.Schema({
    dateOfRecovery: {
        type: Date,
        default: Date.now
    },

    recoveryTechnical: {
        type: String
    },
    position: {
        type: String, enum: ['Left', 'Right']
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
        type: Boolean,
        default: false
    },
    clarity: {
        type: String,
    },
    lens: {
        type: String,
    },

});
const Cornea = mongoose.model('Cornea', corneaSchema);
module.exports = Cornea
