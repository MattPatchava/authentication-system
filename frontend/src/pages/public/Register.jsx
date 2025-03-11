import { Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';

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
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "250px" }}>
            <label>Username:</label>
            <input type="text" />
            <label>Password:</label>
            <input type="password" />
            <label>Confirm Password:</label>
            <input type="password" />
            <label type="text">First Name:</label>
            <input type="text" />
            <label type="text">Last Name:</label>
            <input type="text" />
            <button style={{ alignSelf: "start" }}>Register</button>
            <p style={{ margin: "0" }}>Already have an account? <Link to="/login">Login here.</Link></p>
        </div>
    );
};

export default Register;
