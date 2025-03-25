const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears the refresh token cookie.
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Refresh cookie cleared
 */
router.post('/', (req, res, next) => {
    res.clearCookie("refreshToken", { path: '/' });
    res.status(200).json({ message: "Refresh cookie cleared." });
});

module.exports = router;
