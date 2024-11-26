import React, { useState } from "react";
import axios from "axios";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    instituteId: "",
    cg: "",
    backlogs: "",
    passingYear: "",
    degree: "B.Tech",
    resume: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); // Use FormData to send text and file data
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:3080/api/students/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(response.data.message);
      setError("");
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
          name="name"
          placeholder="Name"
          value={formData.name}
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
          type="text"
          name="instituteId"
          placeholder="Institute ID"
          value={formData.instituteId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cg"
          placeholder="CGPA"
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
          type="number"
          name="passingYear"
          placeholder="Passing Year"
          value={formData.passingYear}
          onChange={handleChange}
          required
        />
        <select name="degree" value={formData.degree} onChange={handleChange}>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>
        <input type="file" name="resume" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
