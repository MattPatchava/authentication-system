const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../../config/postgres.js');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticates user, returns access token and sets refresh token cookie
 *     description: Validates user credentials and returns a short-lived access token in the response body and a long-lived refresh token as a secure httpOnly cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Login successful, access token returned, refresh token set as cookie
 *         headers:
 *           Set-Cookie:
 *             description: |
 *               Refresh token cookie.
 *               - Name: `refreshToken`
 *               - httpOnly: true
 *               - secure: true
 *               - sameSite: None
 *               - maxAge: 7 days
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       400:
 *         description: Email or password not provided
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res, next) => {
    try {
        const { email, password, keepLoggedIn } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and/or password not provided" });

        const response = await pool.query('SELECT * FROM users WHERE email = $1',
        [email]);
        const user = response.rows[0];
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isPasswordMatch = await isValidCredentials(password, user);

        if (!isPasswordMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        // Valid credentials received

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: keepLoggedIn ? "1w" : "15m" }
        );

        if (keepLoggedIn) {
            res
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .status(200)
                .json({
                    accessToken,
                    message: "Login successful",
                });
        } else {
            res
                .status(200)
                .json({
                    refreshToken,
                    accessToken,
                    message: "Login successful",
                });
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

const isValidCredentials = async (password, user) => {
    return await bcrypt.compare(password, user.password_hash);
};

router.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
