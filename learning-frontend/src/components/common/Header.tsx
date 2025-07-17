import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import UserService from '../service/UserService';

export default function Header() {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth?.isAuthenticated ?? false;
  const logout = auth?.logout ?? (() => {});
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const token = localStorage.getItem('token') || '';
          const response = await UserService.getUserProfile(token);
          setUserName(response.data.myUsers.name || 'User');
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      })();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand" to="/">My Application</Link>

        <div className="d-flex align-items-center">
          {!isAuthenticated ? (
            <>
              <Link className="btn btn-outline-primary me-2" to="/auth/login">Login</Link>
              <Link className="btn btn-primary" to="/auth/register">Register</Link>
            </>
          ) : (
            <>
              {/* Welcome message and link to profile */}
              <Link to="/profile" className="nav-link me-2 px-0 text-decoration-underline text-primary">
                Welcome, {userName}
              </Link>

              <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
