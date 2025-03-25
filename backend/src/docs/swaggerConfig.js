const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication System',
            version: '1.0.0',
            description: `This API provides a secure authentication system built with Node.js, Express, and PostgreSQL. It includes routes for user registration, login with JWT-based access and refresh tokens, protected profile access, and token refreshing and revocation. Designed to support modern web applications.`
,
        },
        servers: [
            {
                url: `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`
            },
        ],
    },
    apis: ['./routes/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
