const express = require("express");
const { getDonor, createDonor, updateDonor, getVerification, getDonorById, deleteDonor } = require("../controller/DonorController");

const router = express.Router();

router.get('/', getDonor); 
router.post('/register',createDonor); 
router.put('/update/:id', updateDonor); 
router.get("/verify/:tokenId", getVerification);
router.get('/:id', getDonorById);
router.delete('/delete/:id', deleteDonor);

module.exports = router;
