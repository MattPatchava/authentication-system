import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { register } from '../../services/authService.js';

function Register() {
    return (
        <div>
            <Header />
            <div className="m-4">
                <RegisterForm />
            </div>
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
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {

            const response = await register(email, password, firstName, lastName);
            if (response.status === 201) {
                setSuccessMessage("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login', { state: { message: "Registration successful! Please login." } });
                }, 2000);
            }
        } catch (error) {
            if (error.status === 409)
                setErrorMessage('Email already exists.');
            else if (error.status === 500)
                setErrorMessage('Server error. Try again later.');
            else
                setErrorMessage(`Registration failed. Try again.`)
            console.error(`Registration error: `, error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form 
            onSubmit={(e) => handleRegister(e)}
            className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-96">
            <label>Email:</label>
            <input className="input" type="text" onChange={(e) => setEmail(e.target.value)} />
            <label type="text">First Name:</label>
            <input className="input" type="text" onChange={(e) => setFirstName(e.target.value)}/>
            <label type="text">Last Name:</label>
            <input className="input" type="text" onChange={(e) => setLastName(e.target.value)}/>
            <label>Password:</label>
            <input className="input" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <label>Confirm Password:</label>
            <input className="input" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button 
                type="submit"
                disabled={loading} 
                className="btn btn-primary"
            >
                {loading ? "Submitting data..." : "Register"}
            </button>

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <p style={{ margin: "0" }}>Already have an account? <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Login here.</Link></p>
        </form>
    );
};

export default Register;
