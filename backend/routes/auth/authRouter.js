const express = require('express');
const router = express.Router();

const loginRoutes = require('./login.js');
const registerRoutes = require('./register.js');
const refreshRouter = require('./refresh.js');
const profileRouter = require('./profile.js');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/refresh', refreshRouter);
router.use('/profile', profileRouter);

module.exports = router;
