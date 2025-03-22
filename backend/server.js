const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
}));

const pool = require('./config/postgres.js');

const connectToDB = require('./config/db.js');
connectToDB();

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth/authRouter.js');
app.use('/auth', authRoutes);

const PORT = process.env.SERVER_PORT;
const INTERFACE = process.env.SERVER_IP;
app.listen(PORT, INTERFACE, () => {
    console.log(`Server listening on ${INTERFACE}:${PORT}`);
});

// Omit from production - for early db testing
async function getUsers() {
    try {
        const users = await pool.query('SELECT * FROM users');
        console.log(users.rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

getUsers();
