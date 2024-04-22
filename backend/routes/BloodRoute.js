const { createSampleBlood, getSerologyTest, deleteSerology, updateSerology } = require("../controller/SampleBlood");
const express = require("express");
const route = express.Router();

route.post("/create", createSampleBlood);
route.get("/", getSerologyTest);
// route.get("/getOne/:id", BloodController.GetBloodById);
route.put("/update/:id", updateSerology);
route.delete("/delete/:id", deleteSerology);

module.exports = route;