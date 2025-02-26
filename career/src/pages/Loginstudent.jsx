import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LoginStudent = () => {
  const [formData, setFormData] = useState({
    instituteId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/authRoutes/login",  // Ensure correct route
        {
          institute_id: formData.instituteId,  // Match backend field names
          password: formData.password,
        },
        { withCredentials: true } // Ensures cookies (refresh token) are stored
      );
  
      const { accessToken } = response.data;
      localStorage.setItem("authToken", accessToken); // Store token in localStorage
  
      setError("");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem' }}>Student Login</h2>
      {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="instituteId" style={{ marginTop: '10px', color: '#555' }}>Institute ID:</label>
        <input
          type="text"
          name="instituteId"
          placeholder="Institute ID"
          value={formData.instituteId}
          onChange={handleChange}
          required
          style={{
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            backgroundColor: '#fff'
          }}
        />
        <label htmlFor="password" style={{ marginTop: '10px', color: '#555' }}>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
            backgroundColor: '#fff'
          }}
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
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        Haven't registered?{" "}
        <NavLink 
          to="/register" 
          style={{
            color: '#007BFF', 
            textDecoration: 'none', 
            cursor: 'pointer'
          }}
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default LoginStudent;
