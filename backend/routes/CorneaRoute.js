const CorneaController = require('../controller/CorneaController');
const express = require('express');
const route = express.Router();
route.post('/create', CorneaController.createCornea);
route.get('/read', CorneaController.getCorneas);
route.get('/store', CorneaController.getStoredCornea);
route.get('/getOne/:id', CorneaController.getCornea);
route.put('/update/:id', CorneaController.editCornea);
route.put('/evaluate/:id', CorneaController.evaluateCornea);
route.put('/distribute/:id', CorneaController.distributeCornea);
route.delete('/delete/:id', CorneaController.deleteCornea);
route.post('/search', CorneaController.getCorneaBLotnum);
route.put('/distributed/:id', CorneaController.distributedCorneaController);


module.exports = route