import { Link } from 'react-router-dom';

function Header() {
    return (
        <h1>🔒
        <Link to='/'>
            Authentication System
        </Link>
        🔒</h1>
    );
};

export default Header;
