const mongoose = require("mongoose");
var currentDate = new Date();
var expiration = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
var expirationDate = expiration.toISOString();
const corneaSchema = new mongoose.Schema(
  {
    // collect: {
    //     type: Boolean,
    //     default: false,
    // },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhysicalExam",
    },
    lotNo: {
      type: String,
    },
    isDiscarded: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
    },
    dateOfRecovery: {
      type: Date,
      default: Date.now,
    },
    recoveryTechnical: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      required: true,
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
      default: false,
    },
    isTested: {
      type: Boolean,
      default: false,
    },
    expirationDate: {
      type: Number,
      default: 0,
    },
    // expirationDate: {
    //     type: Date,
    //     default: expirationDate
    // },
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
        // discard: {
        //     reason: {
        //         type: String,
        //         default: "none"
        //     }
        // }
  },
  { timestamps: true }
);
const Cornea = mongoose.model("Cornea", corneaSchema);
module.exports = Cornea;
