const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../../models/User.js');

const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Email and/or password not provided" });

        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isPasswordMatch = await isValidCredentials(password, user);

        if (!isPasswordMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Valid credentials received

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // Set to `true` in production
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
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
    return await bcrypt.compare(password, user.password);
};

router.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
