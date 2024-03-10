const CorneaController = require('../controller/CorneaController');
const express = require('express');
const route = express.Router();
route.post('/create', CorneaController.createCornea);
route.get('/read', CorneaController.getCorneas);
route.get('/getOne/:id', CorneaController.getCornea);
route.put('/update/:id', CorneaController.editCornea);
route.put('/evaluate/:id', CorneaController.evaluateCornea);
route.delete('/delete/:id', CorneaController.deleteCornea);
module.exports = route