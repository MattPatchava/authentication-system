import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { register } from '../../services/authService.js';

function Register() {
    return (
        <div>
            <Header />
            <h2>Register Page</h2>
            <RegisterForm />
        </div>
    );
};

function RegisterForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    async function handleRegister() {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {

            const response = await register(email, password, firstName, lastName);
            if (response.status === 201) {
                setSuccessMessage("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login', { state: { message: "Registration successful! Please login." } });
                }, 2000);
            } else {
                console.log(response);
                throw new Error('Invalid submission');
            }
        } catch (error) {
            setError(`Registration failed. Try again.`)
            console.error(`Registration error: `, error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "250px" }}>
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <label>Confirm Password:</label>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            <label type="text">First Name:</label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)}/>
            <label type="text">Last Name:</label>
            <input type="text" onChange={(e) => setLastName(e.target.value)}/>
            <button onClick={handleRegister} disabled={loading} style={{ alignSelf: "start" }}>
                {loading ? "Submitting data..." : "Register"}
            </button>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <p style={{ margin: "0" }}>Already have an account? <Link to="/login">Login here.</Link></p>
        </div>
    );
};

export default Register;
