import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../services/authService.js';
import Header from '../../components/Header.jsx';

function Login() {
    return (
        <div>
            <Header />
            <h2>Login Page</h2>
            <CredentialsForm />
        </div>
    );
};

function CredentialsForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState(null);

    const location = useLocation();
    const [stateMessage, setStateMessage] = useState('');
    useEffect(() => {
        if (location.state?.message)
            setStateMessage(location.state.message);
    }, [location]);

    const navigate = useNavigate();

    async function handleLogin() {
        setLoading(true);
        setError('');

        try {
            const response = await login(username, password);
            if (response.status === 200) {
                console.log(`Login successful: `, response);
                setAccessToken(response.data.accessToken);
            } else {
                console.log(response);
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setError(`Login failed. Check your credentials.`);
            console.error(`Login error: `, error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (accessToken) {
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard', { state: { message: "Registration successful! Please log in." } });
            }, 2000);
        }
    }, [accessToken]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "250px" }}>
            {stateMessage && <p style={{ color: "green"  }}>{stateMessage}</p>}
            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin} disabled={loading} style={{ alignSelf: "start" }}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red", margin: "0" }}>{error}</p>}
            <p style={{ margin: "0"  }}>Don't have an account? <Link to="/register">Register here.</Link></p>
        </div>
    );
};

export default Login;
