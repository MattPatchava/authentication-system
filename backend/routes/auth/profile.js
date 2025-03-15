const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/verifyAccessToken.js');
const User = require('../../models/User.js');

router.get('/', verifyAccessToken, async () => {
    
});

module.exports = router;
