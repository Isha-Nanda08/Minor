import React, { useState } from "react";
import axios from "axios";

const CompanyUpload = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    minCGPA: "",
    eligibleBranches: "",
    maxBacklogs: "",
    degree: "B.Tech",
    package: "",
    stipend: "",
    visitingYear: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3080/api/companies/add", formData);
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      width: "80%",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      backgroundColor: "#fff",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      backgroundColor: "#fff",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4c6daf",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#31466f",
    },
    error: {
      color: "#ff0000",
      fontSize: "0.9rem",
      marginBottom: "10px",
      textAlign: "center",
    },
    success: {
      color: "#4c6daf",
      fontSize: "0.9rem",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload Company Details</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="minCGPA"
          placeholder="Minimum CGPA"
          value={formData.minCGPA}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="eligibleBranches"
          placeholder="Eligible Branches (comma-separated)"
          value={formData.eligibleBranches}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="maxBacklogs"
          placeholder="Maximum Backlogs Allowed"
          value={formData.maxBacklogs}
          onChange={handleChange}
          required
        />
        <select
          style={styles.select}
          name="degree"
          value={formData.degree}
          onChange={handleChange}
        >
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>
        <input
          style={styles.input}
          type="number"
          name="package"
          placeholder="Package (LPA)"
          value={formData.package}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="number"
          name="stipend"
          placeholder="Stipend (INR)"
          value={formData.stipend}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="number"
          name="visitingYear"
          placeholder="Visiting Year"
          value={formData.visitingYear}
          onChange={handleChange}
          required
        />
        <button
          style={styles.button}
          type="submit"
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CompanyUpload;
