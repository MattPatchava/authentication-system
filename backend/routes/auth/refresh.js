const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyAccessToken = require('../../middleware/verifyAccessToken.js');

router.post('/', verifyAccessToken, async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)
            res.status(401).json({ message: "No refresh token provided" });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res
            .status(200)
            .json({ accessToken: newAccessToken });
            
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

module.exports = router;
