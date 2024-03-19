const AccidentController = require("../controller/AccidentController");
const express = require("express");
const route = express.Router();
route.post("/create", AccidentController.CreateAccident);
module.exports = route