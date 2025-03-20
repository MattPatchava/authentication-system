import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

export function useFetchUser(redirectOnLogout = true) {
    const { accessToken, setAccessToken, user, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            async function refreshAccessToken() {
                const response = await axios.post(
                    '/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                console.log("Refresh access token response", response.data);
                setAccessToken(response.data.accessToken);
            }

            async function fetchUser() {

                const response = await axios.get(
                    '/auth/profile',
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                        withCredentials: true
                    },
                );
                console.log(`Fetched User`, response.data);
                setUser(response.data);
                setLoading(false);
            }

            function handleLogout() {
                logout();
                setLoading(false);
            }

            try {
                if (!accessToken) await refreshAccessToken();
            } catch (refreshAccessTokenError) {
                console.error("Error:", refreshAccessTokenError);
                handleLogout();
            }

            try {
                if (accessToken) await fetchUser();
            } catch (error) {
                console.error("Error:", error);
                handleLogout();
            }

        }

        fetchData();
    }, [accessToken]);

        return loading;
}
