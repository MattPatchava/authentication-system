import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_BASE_URL + '/auth/login',
                { email, password },
                { withCredentials: true }
            );
            setAccessToken(response.data.accessToken);

            return response; 
        } catch (error) {
            console.error(error);
            if (!error.response)
                throw new Error("Network Error: Could not connect to the server.");

            throw error;
        }
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        axios.post(import.meta.env.VITE_API_BASE_URL + '/auth/logout', {}, { withCredentials: true });
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

    useEffect(() => {
        if (!accessToken) return; // Only refresh if logged in
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}
