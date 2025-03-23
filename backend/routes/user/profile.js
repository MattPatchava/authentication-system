const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/verifyAccessToken.js');

const pool = require('../../config/postgres.js');

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the authenticated user's profile.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        const response = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [req.user]
        );
        const user = response.rows[0];
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
