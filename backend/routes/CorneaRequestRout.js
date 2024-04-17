const express = require("express");
const requestController = require("../controller/CorneaRequestController");
const router = express.Router();

// Route

router.post('/send', requestController.createCorneaRequest);

router.put(
  '/updateRequest/:id',
  requestController.updateCorneaRequestController
);
router.get('/getRequest', requestController.getCorneaRequestController);

router.get('/getRequest/:id', requestController.getSingleCorneaRequestController);
router.delete(
  '/delete-request/:pid',
  requestController.deleteCorneaRequestController
);
router.put('/distribute/:id', requestController.distributeCorneaRequestById);
router.put('/approve/:id', requestController.approveCorneaRequestController);

module.exports = router;
