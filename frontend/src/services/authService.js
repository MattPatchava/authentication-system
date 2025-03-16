import axios from 'axios';

export async function register(email, password, firstName, lastName) {
    if (!email || !password || !firstName || !lastName) {
        alert("All fields are required");
        return;
    }

    try {
        const response = axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
            { email, password, firstName, lastName },
            { headers: { "Content-Type": "application/json" } }
        );

        return response;
    } catch (error) {
        console.log(error.message);
        return error.response;
    }
}
