const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../../config/postgres.js');

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

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
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
//            secure: process.env.NODE_ENV === "production",
//            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res
            .status(200)
            .json({
                message: "Login successful",
                accessToken
            });


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
