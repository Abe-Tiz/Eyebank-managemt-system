const AccidentController = require("../controller/AccidentController");
const express = require("express");
const route = express.Router();
route.post("/create", AccidentController.CreateAccident);
route.get("/read", AccidentController.getAccident);
route.get("/getOne/:id", AccidentController.getOneAccident);
route.put("/update/:id", AccidentController.editAccident);
route.delete("/delete/:id", AccidentController.deleteAccident);
module.exports = route