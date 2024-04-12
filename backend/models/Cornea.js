const mongoose = require('mongoose');
var currentDate = new Date();
var expiration = new Date(currentDate.getTime() + (14 * 24 * 60 * 60 * 1000));
var expirationDate = expiration.toISOString();
const corneaSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhysicalExam",
    },
    lotNo: {
      type: String,
    },
    dateOfRecovery: {
      type: Date,
      default: Date.now,
    },
    recoveryTechnical: {
      type: String,
    },
    position: {
      type: String,
      enum: ["left", "right"],
    },
    eyeLid: {
      type: String,
    },
    size: {
      type: String,
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
    distributed: {
        type: Boolean,
        default: false
    },
    expirationDate: {
      type: String,
      default: 0,
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
        type: String,
      },
      evaluationComment: {
        type: String,
      },
      approval: {
        type: String,
        // enum: ['yes', 'no']
      },
      suiatablity: {
        type: String,
        // enum: ['PK', 'EK', 'ALK', 'KLA', 'K-Pro', 'Therapeutic']
      },
      reason: {
        type: String,
        // enum: ['epitheliam', 'stroma', 'endothelium', 'descement', 'other']
      },
    },
  },

  { timestamps: true }
);
const Cornea = mongoose.model('Cornea', corneaSchema);
module.exports = Cornea
