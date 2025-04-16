import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../Api';
// import '../styles/student-bulletin.css';

const StudentBulletin = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/notifications');
      
      if (response.data && response.data.success) {
        setNotifications(response.data.data);
      } else {
        setError('Failed to load notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Error loading notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bulletin-container">
      <div className="bulletin-header" data-aos="fade-down">
        <h1>Announcement Bulletin</h1>
        <p>Stay updated with the latest announcements from PR representatives</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading notifications...</div>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="bulletin-board" data-aos="fade-up">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </div>
              <p>No announcements available at the moment</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div 
                key={notification._id} 
                className="bulletin-item"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="bulletin-content">
                  <p>{notification.content}</p>
                </div>
                <div className="bulletin-date">
                  {formatDate(notification.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentBulletin;