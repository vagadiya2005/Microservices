const express = require('express');
const router = express.Router();

const {add , all ,search} = require('../controller/profileController');

router.post('/api/v1/profile/add',add);
router.get('/api/v1/profile/alll',all);
router.get('/api/v1/profile/search',search);
// add comment modify comment


module.exports = router;
