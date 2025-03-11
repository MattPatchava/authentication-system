import { Link } from 'react-router-dom';
import Header from '../../components/Header.jsx';

function Home() {
    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
    );
};

export default Home;
