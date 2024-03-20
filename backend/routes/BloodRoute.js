const BloodController = require("../controller/SampleBlood");
const express = require("express");
const route = express.Router();
route.post("/create", BloodController.createSampleBlood);
// route.get("/read", BloodController.GetBlood);
// route.get("/getOne/:id", BloodController.GetBloodById);
// route.put("/update/:id", BloodController.UpdateBlood);
// route.delete("/delete/:id", BloodController.DeleteBlood);
module.exports = route