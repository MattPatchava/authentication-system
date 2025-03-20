import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useFetchUser } from '../../hooks/useFetchUser.js';
import axios from 'axios';

function Home() {
    const { accessToken, setAccessToken, login, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { loading } = useFetchUser();
    console.log(`User state in Home: ${user}`);

    return (
        <div>
            <Header />
        </div>
    );

};

export default Home;
