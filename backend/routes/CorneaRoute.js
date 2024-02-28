const CorneaController = require('../controller/CorneaController');
const express = require('express');
const route = express.Router();
route.post('/create', CorneaController.createCornea);
route.get('/read', CorneaController.getCornea);
module.exports = route