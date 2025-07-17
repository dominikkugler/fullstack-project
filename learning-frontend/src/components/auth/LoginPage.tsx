import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { AuthContext } from '../../AuthContext'; // adjust path

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext not found');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('userId', userData.userId);
        auth.login();  // informs the context about login
        navigate('/profile');
      } else {
        setError('Invalid credentials. Please try again.');
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      console.error(err);
      setError('Oops! Something went wrong. Try again later.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3 text-center">Welcome back!</h2>
      <p className="text-center text-muted mb-4">
        Enter your credentials to access your account.
      </p>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/auth/forgot-password" className="small">Forgot password?</Link>
          <Link to="/auth/register" className="small">New user? Register</Link>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
      </form>

      <div className="mt-4 text-center text-muted">
        By logging in, you agree to our <Link to="/terms">Terms of Service</Link>.
      </div>
    </div>
  );
}
