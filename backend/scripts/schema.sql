CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

GRANT ALL ON ALL TABLES IN SCHEMA public TO auth_app_user;
