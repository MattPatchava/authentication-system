const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log('PostgreSQL pool connected');
});

pool.on('error', () => {
    console.error('Unexpected error on idle client:', error);
    process.exit(1);
});

module.exports = pool;
