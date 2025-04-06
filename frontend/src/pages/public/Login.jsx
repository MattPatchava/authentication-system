import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

function Login() {
    return (
        <div>
            <Header />
            <div className="m-4">
                <CredentialsForm />
            </div>
        </div>
    );
};

function CredentialsForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { accessToken, keepLoggedIn, setKeepLoggedIn, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        console.log(`Sending login request with email ${email} and password ${password}`);
        setLoading(true);

        const timeoutId = setTimeout(() => {
            setLoading(false);
            setError('Server is not responding. Please try again later.');
        }, 2000);

        try {
            const response = await login(email, password, keepLoggedIn);
            clearTimeout(timeoutId);
            setLoading(false);
        
            navigate('/dashboard', { state: { message: "Logged in successfully." } });
        } catch (error) {
            clearTimeout(timeoutId);

            if (!error.response)
                setError("Could not connect to the server.");
            else if (error.response.status === 401)
                setError("Invalid credentials. Try again.");
            else if (error.response.status === 404)
                setError("User not found. Check the username and try again.");
            else if (error.response.status >= 500)
                setError('Server error. Try again later.');
            else
                setError(error.response.data?.message || "An unknown error occurred.");

            setLoading(false);
        } 
    };
    
    const location = useLocation();
    const [stateMessage, setStateMessage] = useState('');
    
    useEffect(() => {
        if (location.state?.message)
            setStateMessage(location.state.message);
    }, [location]);

    return (
        <form 
            onSubmit={(e) => handleLogin(e)} 
            className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-96"
        >
            {stateMessage && <p style={{ color: "green" }}>{stateMessage}</p>}
            
            <label>Email:</label>
            <input 
                className="input" 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />

            <label>Password:</label>
            <input 
                className="input" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
                type="submit" 
                disabled={loading} 
                className="btn btn-primary"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p style={{ color: "red", margin: "0" }}>{error}</p>}

            <label className="fieldset-label">
                <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                    className="checkbox" />
            Remember me
            </label>

            <p style={{ margin: "0" }}>
                Don't have an account? <Link to="/register" className="text-blue-500 underline hover:text-blue-700">Register here.</Link>
            </p>
        </form>
    );
};

export default Login;
