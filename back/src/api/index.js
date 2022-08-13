const express = require('express');
const registerApi = require('./register');
const router = express.Router();
router.use(registerApi);


module.exports = router;
