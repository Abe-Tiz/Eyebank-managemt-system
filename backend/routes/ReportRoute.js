const express = require('express');
const { getDonorCount, getCorneaCount, getEvalutedCorneaCount } = require('../controller/ReportController');
const route = express.Router();



route.get('/', getDonorCount);
route.get('/cornea', getCorneaCount);
route.get("/evaluted", getEvalutedCorneaCount);

module.exports = route;