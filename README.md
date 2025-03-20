# Full-Stack Authentication System

This is a full-stack authentication system built using Node.js, Express, MongoDB, React, and Vite. It includes user registration, login, JWT-based authentication, refresh tokens, and protected routes.

## Project Structure

```
project-root/
│── backend/               # Express.js backend
│   ├── config/            # Database connection setup
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   │   └── auth/          # Authentication routes
│   ├── server.js          # Backend entry point
│   ├── package.json       # Backend dependencies
│   ├── .gitignore         # Backend-specific gitignore
│
│── frontend/              # React frontend (Vite + Tailwind CSS)
│   ├── src/               # React source files
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context for authentication state
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls and authentication logic
│   │   ├── main.jsx       # Frontend entry point
│   │   ├── App.jsx        # Root component
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── package.json       # Frontend dependencies
│   ├── .gitignore         # Frontend-specific gitignore
│
│── README.md              # High-level project documentation
```

___

---

## Features

### Backend (Node.js + Express + MongoDB)
- User authentication (JWT access + refresh tokens)
- Protected routes with middleware
- MongoDB integration using Mongoose
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

### Backend Setup

```sh
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```
SERVER_PORT=your-server-port
SERVER_IP=your-server-ip
MONGO_URI=mongodb-connection-string
ACCESS_TOKEN_SECRET=your-access-token-key
REFRESH_TOKEN_SECRET=your-refresh-token-key
FRONTEND_URI=your-frontend-uri
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

| Stack          | Technologies                                     |
| -------------- | ------------------------------------------------ |
| **Backend**    | Node.js, Express, MongoDB, Mongoose, JWT, bcrypt |
| **Frontend**   | React, Vite, Tailwind CSS, React Context API     |
| **Deployment** | N/A (to be added)                                |

___

## Future Improvements

- OAuth login (Google, GitHub, etc.)
- Email verification & password reset
- Dockerisation & CI/CD pipeline
