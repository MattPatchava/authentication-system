const express = require('express');
const router = express.Router()

const bcrypt = require('bcryptjs');
const pool = require('../../config/postgres.js');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user account and stores it in the database.
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
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: New user created
 *       400:
 *         description: Missing fields or invalid password
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res, next) => {

    try {
        console.log('GET received');

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
        const user = await pool.query(
            'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, firstName, lastName]
        );
        // Send 201 confirmation
        console.log(user.rows);
        res.status(201).json({ message: "New user created" });

    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// PostgreSQL error code handler
router.use((err, req, res, next) => {
    if (err.code === '23505')
        return res.status(409).json({ message: "Email already exists." });
    else if (err.code === '23502')
        return res.status(400).json({ message: `Missing required field: ${err.column}` });
    else
        next(err);
});

// Final catch-all error handler
router.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
