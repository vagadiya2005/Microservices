const express = require('express');
const router = express.Router();

const {add , all ,search} = require('../controller/profileController');

router.post('/api/v1/profile/add',add);
router.get('/api/v1/profile/allll',all);
router.get('/api/v1/profile/search',search);


module.exports = router;
