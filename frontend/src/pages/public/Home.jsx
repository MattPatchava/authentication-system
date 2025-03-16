import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useFetchUser } from '../../hooks/useFetchUser.js';
import axios from 'axios';

function Home() {
    const { accessToken, setAccessToken, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const user = useFetchUser(false);
    console.log(`User state in Home: ${user}`);

    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            {user ? <LoggedInView /> : <LoggedOutView />}
        </div>
    );

    function LoggedOutView() {
        return (
            <div>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>
        );
    }

    function LoggedInView() {
        return (
            <div>
                <Link to="/dashboard">Go to Dashboard</Link>
                <br /><br />
                {user && <Link to='/' onClick={logout}>Log Out</Link>}
            </div>
        );
    }

};

export default Home;
