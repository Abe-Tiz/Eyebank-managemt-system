const express = require("express");
const { 
    getDonor, 
    createDonor, 
    updateDonor,
    getVerification, 
    getDonorById, 
    deleteDonor, 
    getDonorByEmail, 
    activateDonor,
    verifyCode,
    loginDonor,
    getloggedInDonor,
    forgotCode,
    resetCode,
    getDonorByName,
    getRecentDonors,
    donatedDonor
  
} = require("../controller/DonorController");

const router = express.Router();

router.get('/', getDonor); 
router.post('/register',createDonor); 
router.put('/update/:id', updateDonor); 
router.get("/verify/:tokenId", getVerification);
router.get("/recentDonors", getRecentDonors);
router.get('/:id', getDonorById);
router.delete('/delete/:id', deleteDonor);
router.post('/verify-code', verifyCode);
router.put("/activate/:id", activateDonor);
router.post("/login", loginDonor);
router.post("/donorLogedin", getloggedInDonor);
router.post('/displayByEmail', getDonorByEmail);
router.post('/search', getDonorByName);
router.post("/forgot_code", forgotCode);
router.post("/reset-code/:id/:token", resetCode); 
 router.post("/donate/:id",donatedDonor)
module.exports = router;
