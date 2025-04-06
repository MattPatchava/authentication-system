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

            async function refreshTokens() {
                const sessionRefreshToken = sessionStorage.getItem("refreshToken");

                const response = await axios.post(
                    import.meta.env.VITE_API_BASE_URL + '/auth/refresh',
                    {},
                    sessionRefreshToken
                    ? { headers: { Authorization: `Bearer ${sessionRefreshToken}` } }
                    : { withCredentials: true }
                );

                if (response.data.refreshToken)
                    sessionStorage.setItem("refreshToken", response.data.refreshToken);

                const newAccessToken = response.data?.accessToken;
                setAccessToken(newAccessToken);

                await fetchUser(newAccessToken);
            }

            async function fetchUser(newAccessToken) {
                const user = await axios.get(
                    import.meta.env.VITE_API_BASE_URL + '/user/profile',
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
                if (!accessToken) await refreshTokens();
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
