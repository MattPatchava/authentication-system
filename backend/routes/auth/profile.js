const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/verifyAccessToken.js');
const User = require('../../models/User.js');

router.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.user);
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
    }
});

router.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
