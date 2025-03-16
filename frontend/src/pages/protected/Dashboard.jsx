import Header from '../../components/Header.jsx';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchUser } from '../../hooks/useFetchUser.js';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const { accessToken, setAccessToken, login, logout, user, setUser } = useContext(AuthContext);

    const { loading } = useFetchUser();
    console.log(`Dashboard user state: ${user}`)

    return (
        <div>
            <Header />
            <h2>Dashboard</h2>
            {loading ? <p>Loading...</p> : user ? <h3>Welcome, {user.firstName}!</h3> : <p>User not found.</p>}
            {user && <Link to='/' onClick={logout}>Log Out</Link>}
        </div>
    );
};

export default Dashboard;
