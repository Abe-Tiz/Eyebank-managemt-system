const HospitalController = require("../controller/HospitalController");
const express = require("express");

const route = express.Router();

route.post("/create", HospitalController.CreatHospital);
route.get("/read", HospitalController.GetHospital);
route.get("/getOne/:id", HospitalController.GetHospitalById);
route.put("/update/:id", HospitalController.UpdateHospital);
route.delete("/delete/:id", HospitalController.DeleteHospital);
route.post("/search", HospitalController.getHospitalByName);

module.exports = route