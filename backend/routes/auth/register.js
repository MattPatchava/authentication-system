const express = require('express');
const router = express.Router()

const bcrypt = require('bcryptjs');
const User = require('../../models/User.js');

router.post('/', async (req, res, next) => {

    try {

        // Get request body fields
        let { email, password, firstName, lastName } = req.body;
        email = email?.trim().toLowerCase();
        firstName = firstName?.trim();
        lastName = lastName?.trim();

        // Validate provided email and password
        if (!email || !password || !firstName || !lastName)
            return res.status(400).json({ message: "All fields are required" });

        // Validate password length
        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters" });

        // Hash password for storage
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        const savedDocument = await user.save();
        // Send 201 confirmation
        res.status(201).json({ message: "New user created" });

    } catch (error) {

        console.error(error.message);

        if (error.code === 11000)
            return res.status(400).json({ message: "User already exists" });

        next(error);
    }
});

// Final catch-all error handler
router.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
