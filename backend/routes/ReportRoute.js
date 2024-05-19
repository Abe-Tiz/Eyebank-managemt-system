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
    // getCorneaByMonthManualy
} = require('../controller/ReportController');
const route = express.Router();



route.get('/', getDonorCount);
route.get('/cornea', getCorneaCount);
route.get("/evaluted", getEvalutedCorneaCount);
route.get("/cornea-month", getCorneaByMonth);
// route.post("/cornea-month/report", getCorneaByMonthManualy);
route.get("/serology", getTestedCount);
route.get("/physical", getPhysicalExaminedCount);
route.get("/distributed", getDistributedCorneaCount);
route.get("/distributed-month", getDistributedCorneaByMonth);
route.get("/pledge-month", getPledgeByMonth);
route.get("/user", getUserCount);

module.exports = route;