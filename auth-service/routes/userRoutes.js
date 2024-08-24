const express = require('express');
const router = express.Router();

const {register , login ,logout} = require('../controller/userController');


router.post('/api/v1/auth/register', register);
router.post('/api/v1/auth/login', login);
router.delete('/api/v1/auth/logout',logout);

module.exports = router;
