import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/eligible.css'
const Eligible = ({ studentId }) => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3080/api/students/eligibility/${studentId}`
        );
        setCompanies(response.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchEligibility();
  }, [studentId]);

  return (
    <div className="student-dashboard">
      <h2>Company Eligibility Status</h2>
      {error && <p className="error">{error}</p>}
      {companies.length > 0 ? (
        <div className="company-list">
          {companies.map((company, index) => (
            <div key={index} className="company-card">
              <h3>{company.companyName}</h3>
              <p>Role: {company.role}</p>
              <p>Status: {company.eligible}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
};

export default Eligible;
