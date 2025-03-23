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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

const router = require('./routes/router.js');
app.use('/', router);

const PORT = process.env.SERVER_PORT;
const INTERFACE = process.env.SERVER_IP;
app.listen(PORT, INTERFACE, () => {
    console.log(`Server listening on ${INTERFACE}:${PORT}`);
});
