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
        console.log("Token:", req.cookies?.refreshToken || req.headers?.authorization || null);
        const cookieRefreshToken = req.cookies?.refreshToken || null;
        const authHeader  = req.headers?.authorization || null;

        if (cookieRefreshToken && authHeader)
            return res.status(400).json({ message: "Multiple token sources provided" });

        const refreshToken = cookieRefreshToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(' ')[1] : null);
        const keepLoggedIn = cookieRefreshToken;

        if (!refreshToken)
            return res.status(401).json({ message: "No refresh token provided" });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { userId: decoded.userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: keepLoggedIn ? "1w" : "15m" }
        );


        if (keepLoggedIn) {
            res
                .cookie(
                    "refreshToken",
                    newRefreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                })
                .status(200)
                .json({ accessToken: newAccessToken });
        } else {
            res
                .status(200)
                .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                
        }
            
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

module.exports = router;
