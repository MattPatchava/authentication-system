import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useFetchUser } from '../hooks/useFetchUser.js';

function Header() {
    const { accessToken, setAccessToken, isAuthenticated, login, logout, user } = useContext(AuthContext);

    const loggedOutHeading = "🔒 Authentication System 🔒";
    const loggedInHeading = "🔓 Authentication System 🔓";

    return (
        <div className="navbar bg-base-100 shadow-sm h-16">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">{user ? loggedInHeading : loggedOutHeading}</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            {isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />}
            </ul>
          </div>
        </div>
    );


    function LoggedOutLinks() {
        return (
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </>
        );
    }

    async function handleLogout() {
        await logout();
        navigate('/');
    }

    function LoggedInLinks() {
        return (
            <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to='/' onClick={logout}>Log Out</Link></li>
            </>
        );
    }

};

export default Header;
