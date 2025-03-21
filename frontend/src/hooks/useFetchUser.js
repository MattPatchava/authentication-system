import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

export function useFetchUser(redirectOnLogout = false) {
    const { accessToken, setAccessToken, user, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            async function refreshAccessToken() {
                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newToken = response.data.accessToken;
                setAccessToken(newToken);
                await fetchUser(newToken);
            }

            async function fetchUser(newAccessToken) {
                const user = await axios.get(
                    import.meta.env.VITE_API_BASE_URL + '/auth/profile',
                    {
                        headers: {
                            "Authorization": `Bearer ${newAccessToken}`
                        },
                        withCredentials: true
                    }
                );

                setUser(user.data);
            }

            function handleLogout() {
                logout();
                setLoading(false);
                if (redirectOnLogout) navigate('/login', { state: { message: "Session expired. Please login again." } })
            }

            try {
                if (!accessToken) await refreshAccessToken();
                else await fetchUser(accessToken);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                handleLogout();
            }
        }


        fetchData();
    }, []);

    return loading;
}
