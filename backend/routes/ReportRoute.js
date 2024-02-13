const express = require('express');
const { getDonorCount } = require('../controller/ReportController');
const route = express.Router();



route.get('/', getDonorCount);

module.exports = route;