import Header from '../../components/Header.jsx';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchUser } from '../../hooks/useFetchUser.js';
import axios from 'axios';
import confetti from 'canvas-confetti';

function Dashboard() {
    const navigate = useNavigate();
    const { accessToken, setAccessToken, login, logout, user, setUser } = useContext(AuthContext);

    const { loading } = useFetchUser();
    console.log("Dashboard user state:", user )

    const fireConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    useEffect(() => {
        if (!loading && user) {
            fireConfetti();
        }
    }, [loading, user]);

    return (
        <div>
            <Header />
            <div className="m-4">
                {loading ? <p>Loading...</p> : user ? <h1 className="text-5xl font-bold text-gray-800 text-center drop-shadow-lg">Welcome, {user.firstName}!</h1> : <p>User not found.</p>}
            </div>
        </div>
    );
};

export default Dashboard;
