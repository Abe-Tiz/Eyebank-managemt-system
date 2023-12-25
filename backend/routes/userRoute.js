const express = require('express');
const {
  createUser,
  getUser,
  loginUser,
  getVerification,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controller/UserController");


const router = express.Router(); 

router.get("/", getUser); 
router.post("/register", createUser); 
router.post("/login", loginUser); 
router.get("/verify/:tokenId", getVerification); 
router.post("/forgot_password", forgotPassword); 
router.post("/reset-password/:id/:token", resetPassword); 
router.delete("/delete/:id", deleteUser);

module.exports = router; 