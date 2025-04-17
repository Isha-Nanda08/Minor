import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../Api';
import '../styles/placement-bulletin.css';

const PlacementBulletin = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStream, setFilterStream] = useState('');
  const [filterPostType, setFilterPostType] = useState('');
  const [filterProgram, setFilterProgram] = useState('');

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

  // Filter notifications based on selected filters
  const filteredNotifications = notifications.filter(notification => {
    let matchesStream = true;
    let matchesPostType = true;
    let matchesProgram = true;

    if (filterStream && notification.stream) {
      matchesStream = notification.stream === filterStream;
    }

    if (filterPostType && notification.postType) {
      matchesPostType = notification.postType === filterPostType;
    }

    if (filterProgram && notification.program) {
      matchesProgram = notification.program === filterProgram;
    }

    return matchesStream && matchesPostType && matchesProgram;
  });

  return (
    <div className="bulletin-container">
      <div className="bulletin-filters" data-aos="fade-down">
        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterStream}
            onChange={(e) => setFilterStream(e.target.value)}
          >
            <option value="">Select Stream</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EE">EE</option>
            <option value="ICE">ICE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="CHE">CHE</option>
            <option value="TT">TT</option>
            <option value="BT">BT</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterPostType}
            onChange={(e) => setFilterPostType(e.target.value)}
          >
            <option value="">Select Post Type</option>
            <option value="Full Time">Full Time</option>
            <option value="6 Months Intern + FTE">6 Months Intern + FTE</option>
            <option value="6 Months Internship">6 Months Internship</option>
            <option value="2 Months Internship">2 Months Internship</option>
          </select>
        </div>

        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
          >
            <option value="">Select Program</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
            <option value="M.Sc">M.Sc</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading announcements...</div>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="bulletin-board" data-aos="fade-up">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </div>
              <p>No placement announcements available matching your filters</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification._id}
                className="bulletin-item"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="bulletin-content">
                  {notification.isNew && <span className="new-tag">NEW</span>}
                  <h3>{notification.companyName || notification.title || 'Company Visit'}</h3>
                  <p>{notification.content}</p>
                  <div className="event-date">
                    <span>Event Date:</span> 
                    <span className="date-range">
                      {notification.visitDate ? formatDate(notification.visitDate) : 
                       notification.startDate ? formatDate(notification.startDate) : 
                       formatDate(notification.createdAt)}
                      {notification.endDate && ` - ${formatDate(notification.endDate)}`}
                    </span>
                  </div>
                  {notification.eligibility && (
                    <div className="eligibility-info">
                      <span>Eligibility:</span> {notification.eligibility}
                    </div>
                  )}
                  {notification.position && (
                    <div className="position-info">
                      <span>Position:</span> {notification.position}
                    </div>
                  )}
                  {notification.ctc && (
                    <div className="ctc-info">
                      <span>CTC:</span> {notification.ctc}
                    </div>
                  )}
                  {notification.registerBy && (
                    <div className="register-by">
                      <span>Register By:</span> {formatDate(notification.registerBy)}
                    </div>
                  )}
                  {notification.registrationLink && (
                    <div className="registration-link">
                      <a href={notification.registrationLink} target="_blank" rel="noopener noreferrer">
                        Register Here
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          <div className="view-all">
            <a href="/all-placements">View All →</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementBulletin;