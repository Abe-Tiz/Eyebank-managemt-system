const express = require("express");
const requestController = require("../controller/CorneaRequestController");
const router = express.Router();

// Route

router.post("/send", requestController.createCorneaRequest);

router.put(
  "/updateRequest/:pid",
  requestController.updateCorneaRequestController
);
router.get("/getRequest", requestController.getCorneaRequestController);

router.get("/getRequest/:pid", requestController.getSingleCorneaRequestController);
router.delete(
  "/delete-request/:pid",
  requestController.deleteCorneaRequestController
);

router.put("/approve/:id", requestController.approveCorneaRequestController);

module.exports = router;
