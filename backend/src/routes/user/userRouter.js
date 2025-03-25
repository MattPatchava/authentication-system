const express = require('express');
const router = express.Router();

const profileRoutes = require('./profile.js');
router.use('/profile', profileRoutes);

module.exports = router;
