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

  return (
    <div className="company-upload">
      <h2>Upload Company Details</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="minCGPA"
          placeholder="Minimum CGPA"
          value={formData.minCGPA}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="eligibleBranches"
          placeholder="Eligible Branches (comma-separated)"
          value={formData.eligibleBranches}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxBacklogs"
          placeholder="Maximum Backlogs Allowed"
          value={formData.maxBacklogs}
          onChange={handleChange}
          required
        />
        <select name="degree" value={formData.degree} onChange={handleChange}>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>
        <input
          type="number"
          name="package"
          placeholder="Package (LPA)"
          value={formData.package}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stipend"
          placeholder="Stipend (INR)"
          value={formData.stipend}
          onChange={handleChange}
        />
        <input
          type="number"
          name="visitingYear"
          placeholder="Visiting Year"
          value={formData.visitingYear}
          onChange={handleChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CompanyUpload;
