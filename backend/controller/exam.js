
const PhysicalExam = require("../models/PhysicalExam");
const Donor = require("../models/Donor");

// Get all physical exams with populated donor field
const getAllPhysicalExams = async (req, res) => {
  try {
    const physicalExams = await PhysicalExam.find().populate({
      path: "donor",
      select: "id",
    })
  ;
    res.json(physicalExams);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

// Create a new physical exam
const createPhysicalExam = async (req, res) => {
  try {
    const {
      height,
      weight,
      sex,
      isRefrigerated,
      examined,
      highRiskexamined,
      causeOfDeath,
      dod,
      story,
      time,
      donor, // Add the donor field to the request body
    } = req.body;

    const physicalExam = new PhysicalExam({
      height,
      weight,
      sex,
      isRefrigerated,
      examined,
      highRiskexamined,
      causeOfDeath,
      dod,
      story,
      time,
      donor, // Assign the donor field value
    });

    const savedPhysicalExam = await physicalExam.save();
    res.status(201).json(savedPhysicalExam);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

// Get a specific physical exam by ID with populated donor field
const getPhysicalExamById = async (req, res) => {
  try {
    const physicalExam = await PhysicalExam.findById(req.params.id).populate(
      "donor"
    );
    if (!physicalExam) {
      return res.status(404).json({ error: "Physical exam not found" });
    }
    res.json(physicalExam);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a specific physical exam by ID
const updatePhysicalExamById = async (req, res) => {
  try {
    const {
      height,
      weight,
      sex,
      isRefrigerated,
      examined,
      highRiskexamined,
      causeOfDeath,
      dod,
      story,
      time,
      donor, // Add the donor field to the request body
    } = req.body;

    const physicalExam = await PhysicalExam.findById(req.params.id);
    if (!physicalExam) {
      return res.status(404).json({ error: "Physical exam not found" });
    }

    physicalExam.height = height;
    physicalExam.weight = weight;
    physicalExam.sex = sex;
    physicalExam.isRefrigerated = isRefrigerated;
    physicalExam.examined = examined;
    physicalExam.highRiskexamined = highRiskexamined;
    physicalExam.causeOfDeath = causeOfDeath;
    physicalExam.dod = dod;
    physicalExam.story = story;
    physicalExam.time = time;
    physicalExam.donor = donor; // Assign the donor field value

    const updatedPhysicalExam = await physicalExam.save();
    res.json(updatedPhysicalExam);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

// Delete a specific physical exam by ID
const deletePhysicalExamById = async (req, res) => {
  try {
    const physicalExam = await PhysicalExam.findByIdAndDelete(req.params.id);
    if (!physicalExam) {
      return res.status(404).json({ error: "Physical exam not found" });
    }
    res.json({ message: "Physical exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllPhysicalExams,
  createPhysicalExam,
  getPhysicalExamById,
  updatePhysicalExamById,
  deletePhysicalExamById,
};
