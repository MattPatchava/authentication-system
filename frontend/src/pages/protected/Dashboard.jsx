import Header from '../../components/Header.jsx';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchUser } from '../../hooks/useFetchUser.js';
import axios from 'axios';

function Dashboard() {
//    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { accessToken, setAccessToken, login, logout } = useContext(AuthContext);

    const user = useFetchUser();

    return (
        <div>
            <Header />
            <h2>Dashboard</h2>
            {user ? <h3>Welcome, {user.firstName}!</h3> : <p>Loading...</p>}
            {user && <Link to='/' onClick={logout}>Log Out</Link>}
        </div>
    );
};

export default Dashboard;
