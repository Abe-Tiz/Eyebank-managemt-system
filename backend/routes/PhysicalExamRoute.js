const express = require('express');
const router = express.Router();
const {
    getAllPhysicalExams,
    createPhysicalExam,
    getPhysicalExamById,
    updatePhysicalExamById,
    deletePhysicalExamById,
    collectPhysicalExamById
} = require('../controller/physicalExamController');
// Get all physical exams
router.get('/getAll', getAllPhysicalExams);

// Create a new physical exam
router.post('/create', createPhysicalExam);

// Get a specific physical exam by ID
router.get('/getOne/:id', getPhysicalExamById);

// Update a specific physical exam by ID
router.put('/update/:id', updatePhysicalExamById);
router.put('/collect/:id', collectPhysicalExamById);

// Delete a specific physical exam by ID
router.delete('/delete/:id', deletePhysicalExamById);

module.exports = router;