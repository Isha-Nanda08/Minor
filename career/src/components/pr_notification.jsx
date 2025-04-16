import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../Api';

const NotificationForm = () => {
  const [notification, setNotification] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [myNotifications, setMyNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchMyNotifications();
  }, []);

  const fetchMyNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      setLoadingNotifications(true);
      // Log the API request for debugging
      console.log('Fetching notifications from:', '/api/notifications/my-notifications');
      
      const response = await api.get('/api/notifications/my-notifications', config);
      console.log('Notification response:', response);
      
      if (response.data && response.data.success) {
        setMyNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // More detailed error logging
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!notification.trim()) {
      setError('Notification content is required');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      setLoading(true);
      setError('');
      
      // Log the API request for debugging
      console.log('Posting notification to:', '/api/notifications');
      console.log('Payload:', { content: notification, branch });
      
      const response = await api.post('/api/notifications', {
        content: notification,
        branch
      }, config);
      
      console.log('Post response:', response);
      
      if (response.data && response.data.success) {
        setSuccess(true);
        setNotification('');
        setBranch('');
        
        // Fetch updated notifications
        fetchMyNotifications();
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error posting notification:', error);
      // More detailed error logging
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      setError(error.response?.data?.message || 'Error posting notification');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      await api.patch(`/api/notifications/${id}`, { status }, config);
      
      // Refresh notifications after status change
      fetchMyNotifications();
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div className="notification-container">
      <div className="section" data-aos="fade-up">
        <h2>Post a Notification</h2>
        <p>Create notifications to be displayed on the student bulletin board</p>
        
        {success && (
          <div className="success-message">
            Notification posted successfully!
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="notification-form">
          <div className="form-group">
            <label htmlFor="notification">Notification Content</label>
            <textarea
              id="notification"
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              placeholder="Enter notification content..."
              rows="4"
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="branch">Branch (Optional)</label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="form-control"
            >
              <option value="">All Branches</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="action-button"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Notification'}
          </button>
        </form>
      </div>
      
      <div className="section" data-aos="fade-up">
        <h2>My Posted Notifications</h2>
        
        {loadingNotifications ? (
          <div className="loading-spinner-small"></div>
        ) : (
          <>
            {myNotifications.length === 0 ? (
              <div className="empty-state">
                <p>You haven't posted any notifications yet</p>
              </div>
            ) : (
              <div className="notifications-list">
                {myNotifications.map((notif) => (
                  <div key={notif._id} className={`notification-item ${notif.status === 'archived' ? 'archived' : ''}`}>
                    <div className="notification-content">
                      <p>{notif.content}</p>
                      <div className="notification-meta">
                        <span className="notification-date">{formatDate(notif.createdAt)}</span>
                        <span className={`notification-status ${notif.status}`}>{notif.status}</span>
                      </div>
                    </div>
                    <div className="notification-actions">
                      {notif.status !== 'archived' && (
                        <button 
                          onClick={() => handleStatusChange(notif._id, 'archived')}
                          className="action-button small"
                        >
                          Archive
                        </button>
                      )}
                      {notif.status === 'archived' && (
                        <button 
                          onClick={() => handleStatusChange(notif._id, 'posted')}
                          className="action-button small secondary"
                        >
                          Repost
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationForm;