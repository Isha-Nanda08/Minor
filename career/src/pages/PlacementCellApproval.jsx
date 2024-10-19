import React, { useState, useEffect } from 'react';
import '../styles/placement_cell_approval.css'; // CSS for the approval page

const PlacementCellApproval = () => {
  const [waitingList, setWaitingList] = useState([]);

  // Load the waiting list from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('waitingList')) || [];
    setWaitingList(storedList);
  }, []);

  // Approve a notification
  const handleApprove = (index) => {
    const approvedList = JSON.parse(localStorage.getItem('approvedList')) || [];
    approvedList.push(waitingList[index]);
    localStorage.setItem('approvedList', JSON.stringify(approvedList));

    const updatedList = waitingList.filter((_, i) => i !== index);
    setWaitingList(updatedList);
    localStorage.setItem('waitingList', JSON.stringify(updatedList));
  };

  // Reject a notification
  const handleReject = (index) => {
    const updatedList = waitingList.filter((_, i) => i !== index);
    setWaitingList(updatedList);
    localStorage.setItem('waitingList', JSON.stringify(updatedList));
  };

  return (
    <div className="approval-container">
      <h3>Notifications Waiting for Approval</h3>
      {waitingList.length > 0 ? (
        <div className="waiting-list">
          {waitingList.map((notification, index) => (
            <div key={index} className="notification-card">
              <p><strong>{notification.name}</strong> ({notification.branch})</p>
              <p>{notification.desc}</p>
              <button className="approve-btn" onClick={() => handleApprove(index)}>Approve</button>
              <button className="reject-btn" onClick={() => handleReject(index)}>Reject</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications in the waiting list.</p>
      )}
    </div>
  );
};

export default PlacementCellApproval;
