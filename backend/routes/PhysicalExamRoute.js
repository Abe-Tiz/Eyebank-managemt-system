const express = require('express');
const router = express.Router();
const {
    getAllPhysicalExams,
    createPhysicalExam,
    getPhysicalExamById,
    updatePhysicalExamById,
    deletePhysicalExamById
} = require('../controller/physicalExamController');

router.get('/getAll', getAllPhysicalExams);
router.post('/create', createPhysicalExam);
router.get('/getOne/:id', getPhysicalExamById);
router.put('/update/:id', updatePhysicalExamById);
router.delete('/delete/:id', deletePhysicalExamById);

module.exports = router;