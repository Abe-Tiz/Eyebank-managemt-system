const RequestController = require("../controller/RequestController");
const express = require("express");
const router = express.Router();

router.post("/create", RequestController.createRequest);
module.exports = router