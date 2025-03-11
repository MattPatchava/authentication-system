const express = require('express');
const router = express.Router();

const loginRoutes = require('./login.js');
const registerRoutes = require('./register.js');
const refreshRoute = require('./refresh.js');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/refresh', refreshRoute);

router.get('/me', async (req, res, next) => {
    
});

module.exports = router;
