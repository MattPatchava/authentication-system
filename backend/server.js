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

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig.js');
console.log('Swagger paths:', swaggerSpec.paths);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth/authRouter.js');
app.use('/auth', authRoutes);

const PORT = process.env.SERVER_PORT;
const INTERFACE = process.env.SERVER_IP;
app.listen(PORT, INTERFACE, () => {
    console.log(`Server listening on ${INTERFACE}:${PORT}`);
});
