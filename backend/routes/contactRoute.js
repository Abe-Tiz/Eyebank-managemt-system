const express = require('express');
const { CreateContact } = require('../controller/ContactController');
const router = express.Router();

router.post('/create', CreateContact);
module.exports = router;