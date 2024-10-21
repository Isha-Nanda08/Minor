import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/login.css';

const LoginStudent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can handle login logic for IR or PR
    if (username === 'admin' && password === 'password123') {
      alert('Login successful as IR/PR');
      navigate('/dashboard'); // Navigate to the PR board or any desired route
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username(Institute ID):</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginStudent;
