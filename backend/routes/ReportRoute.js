const express = require('express');
const { getDonorCount, getCorneaCount, getEvalutedCorneaCount, getCorneaByMonth } = require('../controller/ReportController');
const route = express.Router();



route.get('/', getDonorCount);
route.get('/cornea', getCorneaCount);
route.get("/evaluted", getEvalutedCorneaCount);
route.get("/cornea-month", getCorneaByMonth);

module.exports = route;