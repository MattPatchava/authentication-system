# Full-Stack Authentication System

This is a full-stack authentication system built using Node.js, Express, PostgreSQL, React, and Vite. It includes user registration, login, JWT-based authentication, refresh tokens, and protected routes.

## Project Structure (Node.js + Express + PostgreSQL / React + Vite)

### Backend

```
backend/
├── config/           # PostgreSQL connection setup
├── middleware/       # JWT verification middleware
├── routes/           # Auth endpoints (register, login, logout, etc.)
├── scripts/          # Shell and SQL scripts for DB setup
├── server.js         # Backend entry point
├── package.json      # Backend dependencies
```

### Frontend

```
frontend/
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # Auth state via React Context API
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Public and protected pages
│   ├── services/     # API interaction
│   ├── App.jsx       # Root component
│   └── main.jsx      # Frontend entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
```

---

## Features

### Backend (Node.js + Express + PostgreSQL)
- User authentication (JWT access + refresh tokens)
- Protected routes with middleware
- PostgreSQL integration using `pg` and SQL queries
- Secure password hashing with bcrypt
- Modular Express router for authentication endpoints

### Frontend (React + Vite + Tailwind CSS)
- User-friendly UI with Tailwind CSS
- Login & registration pages
- React Context API for authentication state management
- Token storage & auto-refreshing via refresh tokens
- Protected routes (dashboard) vs. public routes (login/register)

---

## Installation & Setup

### Clone the Repository
```sh
git clone https://github.com/your-username/authentication-system.git
cd authentication-system
```

### Database Setup (PostgreSQL)

Ensure PostgreSQL is installed and running.

1. Configure your `.env.database` with connection information. The `init_db.sh` sources `.env.database`, which should contain:

   ```ini
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_PASSWORD=password
   ```

2. Run the initialisation script:

   ```sh
   cd backend/scripts
   chmod +x init_db.sh
   ./init_db.sh
   ```

3. Apply the schema:

   ```sh
   psql -h localhost -p 5432 -U auth_app_user -d auth_db -f schema.sql
   ```

### Backend Setup

```sh
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following content:

```
SERVER_PORT=3000
SERVER_IP=localhost

ACCESS_TOKEN_SECRET=your-access-token-key
REFRESH_TOKEN_SECRET=your-refresh-token-key
FRONTEND_URI=http://localhost:5173

# PostgreSQL
PGHOST=your-db-host
PGPORT=5432
PGUSER=auth_app_user
PGPASSWORD=your-password
PGDATABASE=auth_db
```

Run the backend:

```sh
npm start
```

### Frontend Setup

```sh
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```
VITE_API_BASE_URL=your-backend-url
```

Run the frontend:

```sh
npm run dev
```

The frontend will start at `http://localhost:5173`.

___

## API Endpoints

### **Authentication Routes**

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | Register a new user  |
| POST   | `/auth/login`    | Login user           |
| POST   | `/auth/refresh`  | Get new access token |
| GET    | `/auth/profile`  | Get user profile     |
| POST   | `/auth/logout`   | Logout user          |

___

## Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login` (receives access + refresh tokens)
3. Frontend stores access token & refresh token
4. Protected routes check for valid access tokens
5. If the access token expires, the refresh token is used to get a new one
6. User logs out and tokens are cleared

___

## Tech Stack

| Stack          | Technologies                                  |
| -------------- | --------------------------------------------- |
| **Backend**    | Node.js, Express, PostgreSQL, pg, JWT, bcrypt |
| **Frontend**   | React, Vite, Tailwind CSS, React Context API  |
| **Deployment** | N/A (to be added)                             |

___

## Future Improvements

- OAuth login (Google, GitHub, etc.)
- Email verification & password reset
- Dockerisation & CI/CD pipeline
