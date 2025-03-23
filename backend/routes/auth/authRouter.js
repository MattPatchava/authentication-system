const express = require('express');
const router = express.Router();

const loginRoutes = require('./login.js');
const registerRoutes = require('./register.js');
const refreshRouter = require('./refresh.js');
const logoutRouter = require('./logout.js');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/refresh', refreshRouter);
router.use('/logout', logoutRouter);

module.exports = router;
