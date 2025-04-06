import { useState, useEffect, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [keepLoggedIn, setKeepLoggedIn] = useState(true);
    const isAuthenticated = !!accessToken;
    const navigate = useNavigate();

    const login = async (email, password, keepLoggedIn) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_BASE_URL + '/auth/login',
                { email, password, keepLoggedIn },
                { withCredentials: true }
            );

            if (response.data.refreshToken)
                sessionStorage.setItem("refreshToken", response.data.refreshToken);

            setAccessToken(response.data.accessToken);

            return response; 
        } catch (error) {
            console.error(error);
            if (!error.response)
                throw new Error("Network Error: Could not connect to the server.");

            throw error;
        }
    };

    const logout = async () => {
        setAccessToken(null);
        setUser(null);
        sessionStorage.clear();
        await axios.post(import.meta.env.VITE_API_BASE_URL + '/auth/logout', {}, { withCredentials: true });
        navigate('/');
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_BASE_URL + `/auth/refresh`,
                {}, { withCredentials: true }
            );
            setAccessToken(response.data.accessToken);
        } catch (error) {
            console.error(error);
            logout();
        }
    };

    const intervalRef = useRef(null);
    useEffect(() => {

        if (!accessToken || intervalRef.current) return; // Only refresh if logged in

        intervalRef.current = setInterval(() => {
            refreshAccessToken();
        }, 14 * 60 * 1000);

        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isAuthenticated, keepLoggedIn, setKeepLoggedIn, login, logout, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}
