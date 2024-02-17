const CorneaController = require('../controller/CorneaController');
const express = require('express');
const route = express.Router();
route.post('/create', CorneaController.createCornea);
module.exports = route