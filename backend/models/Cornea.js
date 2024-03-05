const mongoose = require('mongoose');
const corneaSchema = new mongoose.Schema({
    DonorId: {
        // type: SchemaTypes.ObjectId,
        // ref: 'donor'
        type: String

    },
    nameOfSurgeon: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    Position: {
        type: String, enum: ['Left', 'Right']
    },
    EyeLid: {
        type: String,
    },
    size: {
        type: Number,
    },
    IrisColor: {
        type: String,
    },

    CorneaStatus: {
        type: Boolean,
        default: false
    },
    Clarity: {
        type: String,
    },
    Lens: {
        type: String,
    },

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
const Cornea = mongoose.model('cornea', corneaSchema);
module.exports = Cornea