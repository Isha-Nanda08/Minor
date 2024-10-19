import React, { useState } from 'react';
import '../styles/pr_submit_notification.css'; // CSS for the form

const PrSubmitNotification = () => {
  // State to handle notification inputs
  const [newNotification, setNewNotification] = useState({
    name: '',
    branch: '',
    desc: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setNewNotification({
      ...newNotification,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating saving to a waiting list (you'd actually make an API request here)
    const waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];
    waitingList.push(newNotification);
    localStorage.setItem('waitingList', JSON.stringify(waitingList));

    // Clear the form after submission
    setNewNotification({ name: '', branch: '', desc: '' });
    alert('Notification submitted to the waiting list for approval!');
  };

  return (
    <div className="submit-notification">
      <h3>Submit a Notification</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newNotification.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <input
          type="text"
          name="branch"
          value={newNotification.branch}
          onChange={handleChange}
          placeholder="Enter your branch"
          required
        />
        <input
          type="text"
          name="desc"
          value={newNotification.desc}
          onChange={handleChange}
          placeholder="Enter notification description"
          required
        />
        <button type="submit">Submit Notification</button>
      </form>
    </div>
  );
};

export default PrSubmitNotification;
