import axios from 'axios';
import { useEffect } from 'react';

export async function login(username, password) {
    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            { email: username, password },
            { headers: { "Content-Type": "application/json" } }
        );

        return response;
    } catch (error) {
        console.error("Login error: ", error.message);
        return error.response;
    }
}
