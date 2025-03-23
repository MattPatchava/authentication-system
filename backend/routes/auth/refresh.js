const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Issues a new access token using the refresh token in cookies.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: No refresh token provided
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post('/', async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)
            return res.status(401).json({ message: "No refresh token provided" });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res
            .status(200)
            .json({ accessToken: newAccessToken });
            
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

module.exports = router;
