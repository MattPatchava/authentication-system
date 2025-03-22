#!/bin/bash
source ../.env.database
psql -h "${DB_HOST}" -p "${DB_PORT}" -U postgres <<EOF
CREATE ROLE auth_app_user WITH LOGIN PASSWORD '${DB_PASSWORD}';
CREATE DATABASE auth_db OWNER auth_app_user;
EOF
