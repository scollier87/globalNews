import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';
import { firebaseUrl } from '../../api/config';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleRegister = async (newUser) => {
    try {
        const response = await fetch(`${firebaseUrl}/users.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Registration successful:', data);
        await signIn(newUser.email, newUser.password);
    } catch (error) {
        setError(`Registration failed: ${error.message}`);
    }
};


  const handleSignIn = async (email, password) => {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      const newUser = { username, email, password, favorites: [] };
      handleRegister(newUser);
    } else {
      handleSignIn(email, password);
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
      <button className="toggle-form" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? 'Already have an account? Sign in'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default RegistrationForm;