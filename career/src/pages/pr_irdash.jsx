import React, { useState, useEffect } from 'react';
import '../styles/pr_irdash.css'; 

const PrIrDash = () => {
  const [approvedNotifications, setApprovedNotifications] = useState([]);

  useEffect(() => {
    const approvedList = JSON.parse(localStorage.getItem('approvedList')) || [];
    setApprovedNotifications(approvedList);
  }, []);

  return (
    <div className="dashboard">
      <div className="notify-container">
        <div className="notifications">
          {approvedNotifications.map((info, index) => (
            <div key={index} className="info">
              <div className="desc">{info.desc}</div>
              <div className="pr-name">{info.name}</div>
              <div className="branch">{info.branch}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrIrDash;
