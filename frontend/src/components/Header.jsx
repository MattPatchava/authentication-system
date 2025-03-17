import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useFetchUser } from '../hooks/useFetchUser.js';

function Header() {
    const { accessToken, setAccessToken, login, logout, user } = useContext(AuthContext);

    const { loading } = useFetchUser(false);



    return (
        <div className="navbar bg-base-100 shadow-sm h-16">
            <div className="flex-1">
              <Link to='/' className="btn btn-ghost text-xl">🔒 Authentication System 🔒</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            {loading ? <p>Loading...</p> : user ? <LoggedInLinks /> : <LoggedOutLinks />}
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
