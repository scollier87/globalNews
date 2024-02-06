import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, addUser } from '../../api/firebaseAPI';
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      try {
        const newUser = { username, email, password };
        await addUser(newUser);
        alert('Registration successful!');
        setIsRegistering(false);
        navigate('/');
      } catch (error) {
        setError(`Registration failed: ${error.message}`);
      }
    } else {
      try {
        const users = await fetchUsers();
        let isAuthenticated = false;

        Object.entries(users).forEach(([key, user]) => {
          if (user.email === email && user.password === password) {
            isAuthenticated = true;
            alert('Login successful!');
            setIsLoggedIn(true);
            navigate('/');
          }
        });

        if (!isAuthenticated) {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        setError(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="button-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
      <p className="toggle-form" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? 'Already have an account? Sign in'
          : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default RegistrationForm;
