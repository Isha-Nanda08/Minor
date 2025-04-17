import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import api from '../Api';
import '../styles/pr_notify.css'

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
      const response = await api.get('/api/notifications/my-notifications', config);
      
      if (response.data && response.data.success) {
        setMyNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
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
      
      const response = await api.post('/api/notifications', {
        content: notification,
        branch
      }, config);
      
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
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Bulletin Board Notifications</h1>
          <p className="subheading">Manage and post notifications for students</p>
        </div>
      </div>

      <div className="container">
        <div className="notification-dashboard">
          {/* Post Notification Section */}
          <div className="card" data-aos="fade-up">
            <div className="card-header">
              <h2>Post a Notification</h2>
              <p>Create notifications to be displayed on the student bulletin board</p>
            </div>
            
            <div className="card-body">
              {success && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i> Notification posted successfully!
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-circle"></i> {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="form">
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
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Posting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i> Post Notification
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* My Notifications Section */}
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <div className="card-header">
              <h2>My Posted Notifications</h2>
              <div className="card-actions">
                <button className="btn btn-sm btn-outline" onClick={fetchMyNotifications}>
                  <i className="fas fa-sync-alt"></i> Refresh
                </button>
              </div>
            </div>
            
            <div className="card-body">
              {loadingNotifications ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                  <p className="mt-2">Loading your notifications...</p>
                </div>
              ) : (
                <>
                  {myNotifications.length === 0 ? (
                    <div className="empty-state">
                      <i className="fas fa-bell-slash empty-icon"></i>
                      <p>You haven't posted any notifications yet</p>
                      <small>Notifications you post will appear here</small>
                    </div>
                  ) : (
                    <div className="notification-list">
                      {myNotifications.map((notif) => (
                        <div key={notif._id} className={`notification-item ${notif.status === 'archived' ? 'notification-archived' : ''}`}>
                          <div className="notification-content">
                            <p>{notif.content}</p>
                            <div className="notification-meta">
                              <span className="notification-date">
                                <i className="far fa-calendar-alt mr-1"></i> {formatDate(notif.createdAt)}
                              </span>
                              <span className={`badge badge-${notif.status === 'posted' ? 'success' : 'secondary'}`}>
                                {notif.status === 'posted' ? 'Active' : 'Archived'}
                              </span>
                              {notif.branch && (
                                <span className="notification-branch">
                                  <i className="fas fa-code-branch mr-1"></i> {notif.branch}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="notification-actions">
                            {notif.status !== 'archived' ? (
                              <button 
                                onClick={() => handleStatusChange(notif._id, 'archived')}
                                className="btn btn-sm btn-outline-danger"
                                title="Archive this notification"
                              >
                                <i className="fas fa-archive"></i> Archive
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleStatusChange(notif._id, 'posted')}
                                className="btn btn-sm btn-outline-success"
                                title="Repost this notification"
                              >
                                <i className="fas fa-redo"></i> Repost
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
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;