const express = require('express');
const router = express.Router();

const loginRoutes = require('./login.js');
const registerRoutes = require('./register.js');
const refreshRouter = require('./refresh.js');
const profileRouter = require('./profile.js');
const logoutRouter = require('./logout.js');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/refresh', refreshRouter);
router.use('/profile', profileRouter);
router.use('/logout', logoutRouter);

module.exports = router;
