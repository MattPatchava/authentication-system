import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/public/Home.jsx';
import Login from './pages/public/Login.jsx';
import Register from './pages/public/Register.jsx';
import NotFound from './pages/NotFound.jsx';

import Dashboard from './pages/protected/Dashboard.jsx';

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </AuthProvider>
  );
}

export default App;
