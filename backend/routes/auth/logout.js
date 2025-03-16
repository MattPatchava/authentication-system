const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.clearCookie("refreshToken", { path: '/' });
    res.status(200).json({ message: "Refresh cookie cleared." });
});

module.exports = router;
