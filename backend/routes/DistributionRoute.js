const DistributionController = require("../controller/DistributionController");
const express = require("express");
const route = express.Router();
route.post("/create", DistributionController.createDistribution);
route.get("/read", DistributionController.getDistributeds);
route.get("/eachsurgeon", DistributionController.getEachDistributed);
route.get("/getOne/:id", DistributionController.getDistributed);
route.put("/update/:id", DistributionController.editDistributed);
route.delete("/delete/:id", DistributionController.deleteDistributed);
module.exports = route