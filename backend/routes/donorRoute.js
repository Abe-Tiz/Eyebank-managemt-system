const express = require("express");
<<<<<<< HEAD
const { getDonor, 
    createDonor, 
    updateDonor,
     getVerification, 
     getDonorById,
      deleteDonor,
       getDonorByEmail, 
       getDonorCount } = require("../controller/DonorController");
=======
const { 
    getDonor, 
    createDonor, 
    updateDonor,
    getVerification, 
    getDonorById, 
    deleteDonor, 
    getDonorByEmail, 
    getDonorCount 
} = require("../controller/DonorController");
>>>>>>> origin/main

const router = express.Router();

router.get('/', getDonor); 
router.post('/register',createDonor); 
router.put('/update/:id', updateDonor); 
router.get("/verify/:tokenId", getVerification);
router.get('/:id', getDonorById);
router.delete('/delete/:id', deleteDonor);
router.post('/displayByEmail', getDonorByEmail);
// router.get('/countDonor', getDonorCount);
 
module.exports = router;
