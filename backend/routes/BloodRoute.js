const { createSampleBlood, getSerologyTest, deleteSerology, updateSerology, getSampleByLotnum, discard } = require("../controller/SampleBlood");
const express = require("express");
const route = express.Router();

route.post("/create", createSampleBlood);
route.get("/", getSerologyTest);
// route.get("/getOne/:id", BloodController.GetBloodById);
route.put("/update/:id", updateSerology);
route.delete("/delete/:id", deleteSerology);
route.post("/search", getSampleByLotnum);
route.post("/discard", discard);

module.exports = route;