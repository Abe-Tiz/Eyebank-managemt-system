
const express = require('express');
const router = express.Router();
const {
  getAllPhysicalExams,
  createPhysicalExam,
  getPhysicalExamById,
  updatePhysicalExamById,
  deletePhysicalExamById
} = require('../controller/physicalExamController');

router.get('/physicalExams', getAllPhysicalExams);
router.post('/physicalExams', createPhysicalExam);
router.get('/physicalExams/:id', getPhysicalExamById);
router.put('/physicalExams/:id', updatePhysicalExamById);
router.delete('/physicalExams/:id', deletePhysicalExamById);

module.exports = router;