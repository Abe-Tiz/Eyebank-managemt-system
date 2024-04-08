const express = require('express');
const {
  createUser,
  getUser,
  loginUser,
  getVerification,
  deleteUser,
  forgotPassword,
  resetPassword,
  getloggedInUser,
  getUserById,
  updateUser,
  getUserByName,
  activateUser,
} = require("../controller/UserController");


const router = express.Router(); 

router.get("/", getUser); 
router.post("/register", createUser); 
router.post("/login", loginUser); 
router.get("/verify/:tokenId", getVerification); 
router.post("/forgot_password", forgotPassword); 
router.post("/reset-password/:id/:token", resetPassword); 
router.delete("/delete/:id", deleteUser);
router.post("/userLogedin", getloggedInUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.post("/search", getUserByName);
router.post("/activate", activateUser);

module.exports = router; 