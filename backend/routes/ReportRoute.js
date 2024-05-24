const express = require('express');
const {
  getDonorCount,
  getCorneaCount,
  getEvalutedCorneaCount,
  getCorneaByMonth,
  getTestedCount,
  getPhysicalExaminedCount,
  getDistributedCorneaCount,
  getDistributedCorneaByMonth,
  getPledgeByMonth,
  getUserCount,
    getRequesCount,
    getOcularPost,
    getAdverseReaction,
    getDiscarded,
  getStoredCorneaCount,
  getTransplantedCorneaByMonth,
  getTransplantedCorneaCount,
} = require("../controller/ReportController");
const route = express.Router();



route.get('/', getDonorCount);
route.get('/cornea', getCorneaCount);
route.get("/evaluted", getEvalutedCorneaCount);
route.get("/cornea-month", getCorneaByMonth);
route.get("/serology", getTestedCount);
route.get("/physical", getPhysicalExaminedCount);
route.get("/distributed", getDistributedCorneaCount);
route.get("/distributed-month", getDistributedCorneaByMonth);
route.get("/pledge-month", getPledgeByMonth);
route.get("/user", getUserCount);
route.get("/approved", getRequesCount);
route.get("/ocular", getOcularPost);
route.get("/adverse", getAdverseReaction);
route.get("/discarded", getDiscarded);

route.get("/stored", getStoredCorneaCount);
route.get("/transplanted", getTransplantedCorneaByMonth);
route.get("/transplant-total", getTransplantedCorneaCount);

module.exports = route;