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
router.get('/getRequests', requestController.getCorneasRequestController);
router.get('/getRequest/:id', requestController.getSingleCorneaRequestController);
router.delete(
  '/delete-request/:pid',
  requestController.deleteCorneaRequestController
);
router.put('/distribute/:id', requestController.distributeCorneaRequestById);
router.put('/approve/:id', requestController.approveCorneaRequestController);
router.put('/distributed/:id', requestController.distributedCorneaController);
router.post('/search', requestController.getCorneaBLotnum);

module.exports = router;
