import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <h1>🔒 <Link to='/'>Authentication System</Link> 🔒</h1>
        </div>
    );
};

export default Header;
