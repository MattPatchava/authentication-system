import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useFetchUser(redirectOnLogout = true) {
    const { accessToken, setAccessToken, logout, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    async function fetchUserData() {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_BASE_URL + '/auth/profile',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            console.log(`Fetched user:`, response.data);
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
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
        setUser(null);
        setLoading(false);
        if (redirectOnLogout) navigate('/login');
    }

    useEffect(() => {
        console.log("useFetchUser running. accessToken:", accessToken);
        if (!accessToken) {
            setUser(null);
            setLoading(false);
            return;
        }
        fetchUserData();
    }, [accessToken]);

    return { user, loading };
}
