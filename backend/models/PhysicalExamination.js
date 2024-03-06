const mongoose = require("mongoose");

// high risk examined for donor 
const examinedSchema = new mongoose.Schema({
    head: { type: Boolean, default: false },
    mouth: { type: Boolean, default: false },
    neck: { type: Boolean, default: false },
    arms: { type: Boolean, default: false },
    abdomen: { type: Boolean, default: false },
    genitals: { type: Boolean, default: false },
    arteries: { type: Boolean, default: false },
    back: { type: Boolean, default: false },
});

// risk  examined for the donor
const riskExaminedSchema = new mongoose.Schema({
  sexual: { type: String,enum: ["no evidence", "evidence"],default: "no evidence",},
  analInterCourse: { type: String, enum: ["no evidence", "evidence"] , default: "no evidence",},
  NonMedical: { type: String, enum: ["no evidence", "evidence"] , default: "no evidence",},
  oralThrush: { type: String, enum: ["no evidence", "evidence"] , default: "no evidence",},
  Blue: { type: String, enum: ["no evidence", "evidence"], default: "no evidence", },
  enlargedLiver: { type: String, enum: ["no evidence", "evidence"], default: "no evidence", },
});


const physiaclSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  isRefrigerated: {
    type: Boolean,
    default: false,
  },
  examined: [examinedSchema],
  highRiskexamined: [riskExaminedSchema],
  causeOfDeath: String,
  dod: {
    type: Date,
    required: true,
  },
  strory: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
},
 {
    timestamps: true,
  }
);

const PhysicalExam =
    mongoose.models.physicalExam ||
    mongoose.model("physicalExam", physiaclSchema);

module.exports = PhysicalExam;