import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can handle login logic for PR
    if (username === 'admin' && password === 'password123') {
      alert('Login successful as PR');
      navigate('/pr-ir'); // Navigate to the PR board or any desired route
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.8rem',
        color: '#333'
      }}>PR Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="username" style={{ marginTop: '10px', color: '#555' }}>Username (Institute ID):</label>
        <input
          type="text"
          id="username"
          style={{
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            backgroundColor: '#fff'
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label htmlFor="password" style={{ marginTop: '10px', color: '#555' }}>Password:</label>
        <input
          type="password"
          id="password"
          style={{
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            backgroundColor: '#fff'
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button 
          type="submit" 
          style={{
            padding: '12px',
            backgroundColor: '#4c6daf',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
