import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useFetchUser(redirectOnLogout = true) {
    const [user, setUser] = useState(null);
    const { accessToken, setAccessToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    async function fetchUserData() {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_BASE_URL + '/auth/profile',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setUser(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    const refreshResponse = await axios.post(
                        import.meta.env.VITE_API_BASE_URL + '/auth/refresh', {},
                        { withCredentials: true }
                    );

                    const newAccessToken = refreshResponse.data.accessToken;
                    setAccessToken(newAccessToken);
                    await fetchUserData();
                } catch (refreshError) {
                    console.error("Refresh token expired or invalid", refreshError);
                    handleLogout();
                }
            } else {
                console.error(error);
                handleLogout();
            }
        }
    }

    function handleLogout() {
        logout();
        setUser(null);
        if (redirectOnLogout) navigate('/login');
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return user;
}
