import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed from 'name' to match the model
    institute_id: "",
    branch: "",
    backlogs: "",
    cg: "",
    password: "",
    refreshToken: "", // Optional as per schema
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cg" ? parseFloat(value).toFixed(2) : value, // Ensuring CGPA is formatted correctly
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/students/register", formData);
      setSuccess(response.data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="register-form">
      <h2>Student Registration</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="institute_id"
          placeholder="Institute ID"
          value={formData.institute_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cg"
          placeholder="CGPA (e.g., 8.50)"
          step="0.01"
          value={formData.cg}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="backlogs"
          placeholder="Number of Backlogs"
          value={formData.backlogs}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
