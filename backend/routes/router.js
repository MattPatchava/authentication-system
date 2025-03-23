const express = require('express');
const router = express.Router();

const authRouter = require('./auth/authRouter.js');
router.use('/auth', authRouter);

const userRouter = require('./user/userRouter.js');
router.use('/user', userRouter);

module.exports = router;
