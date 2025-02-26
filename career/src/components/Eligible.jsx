import React, { useState, useEffect } from "react";
import "../styles/eligible.css";

const Eligible = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hardcoded data for now
    const companyData = [
      {
        companyName: "Google",
        role: "Software Engineer",
        eligible: true,
        package: "25 LPA",
        stipend: null,
      },
      {
        companyName: "Flipkart",
        role: "SDE",
        eligible: false,
        package: "20 LPA",
        stipend: null,
      },
      {
        companyName: "Amazon",
        role: "DevOps Engineer",
        eligible: true,
        package: "22 LPA",
        stipend: "50,000 INR",
      },
    ];

    // Set companies data
    setCompanies(companyData);
    setIsLoading(false);
  }, []);

  return (
    <div className="student-dashboard">
      <h2>Company Eligibility Status</h2>
      {isLoading ? (
        <p>Loading eligibility data...</p>
      ) : (
        <>
          {companies.length > 0 ? (
            <div className="company-list">
              {companies.map((company, index) => (
                <div key={index} className="company-card">
                  <h3>{company.companyName}</h3>
                  <p>Role: {company.role}</p>
                  <p>Status: {company.eligible ? "Eligible" : "Not Eligible"}</p>
                  <p>Package: {company.package}</p>
                  {company.stipend && <p>Stipend: {company.stipend}</p>}
                  {company.eligible && (
                    <button className="apply-btn">Apply</button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No companies found</p>
          )}
        </>
      )}
    </div>
  );
};

export default Eligible;
