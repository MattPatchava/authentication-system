import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { accessToken, login, logout } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
                setError("Please enter both email and password.");
        }
        console.log(`Sending login request with email ${email} and password ${password}`);
        setLoading(true);
        const response = await login(email, password);
    }
    
    const location = useLocation();
    const [stateMessage, setStateMessage] = useState('');
    useEffect(() => {
        if (location.state?.message)
            setStateMessage(location.state.message);
    }, [location]);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (accessToken) {
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard', { state: { message: "Logged in successfully." } });
            }, 2000);
        }
    }, [accessToken]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "250px" }}>
            {stateMessage && <p style={{ color: "green"  }}>{stateMessage}</p>}
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
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
