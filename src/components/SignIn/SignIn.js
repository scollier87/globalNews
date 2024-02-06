import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../api/firebaseAPI';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const users = await fetchUsers();
      let isAuthenticated = false;

      Object.entries(users).forEach(([key, user]) => {
        if (user.email === email && user.password === password) {
          isAuthenticated = true;
          alert("Login successful!");
          navigate('/');
          setIsLoggedIn(true);
        }
      });

      if (!isAuthenticated) {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
