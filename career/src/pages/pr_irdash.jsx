import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/pr_irdash.css';
import Footer from '../components/Footer';
import NotificationForm from '../components/pr_notification';
import api from '../Api';

const PrIrDash = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }
        
        // Set authorization header
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        console.log("Attempting to fetch user data with token");
        
        // Make API call to verify token and get user data
        const response = await api.get('/api/auth/current-user', config);
        
        if (response.data && response.data.user) {
          console.log("User data received:", response.data.user);
          setUserData(response.data.user);
          
          const role = response.data.user.role;
          console.log("User role:", role);
          
          setUserRole(role);
          // Check if user is PR
          if (role !== "PR") {
            console.log("Not a PR, redirecting...");
            navigate("/login");
          }
        } else {
          console.log("❌ No user data found in response");
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication Error:", error);
        console.error("Response data:", error.response?.data);
        // Clear invalid token
        localStorage.removeItem('token');
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthAndFetchUser();
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Redirect function for posting company details
  const handlePostCompanyDetails = () => {
    navigate('/companies');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header matching the homepage */}
      <div className="dashboard-header">
        <div className="institute-logo">
          <img src="/institute-logo.png" alt="Institute Logo" className="logo-image" />
        </div>
        <h1 className="dashboard-title">Career Connect - PR Dashboard</h1>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Manage Notifications
        </button>
        <button 
          className={`tab-button ${activeTab === 'companies' ? 'active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          Company Details
        </button>
        <button 
          className={`tab-button ${activeTab === 'queries' ? 'active' : ''}`}
          onClick={() => setActiveTab('queries')}
        >
          Queries
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="welcome-banner" data-aos="fade-up">
              <h2>Welcome, {userData?.name || 'PR Representative'}</h2>
              <p>
                This is your dashboard for managing notifications, company details, and student queries.
                Use the tabs above to navigate between different sections.
              </p>
            </div>

            <div className="action-panels">
              <div className="action-panel" data-aos="fade-up">
                <div className="panel-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>
                <h2>Post a Notification</h2>
                <p>Share important updates with students</p>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="action-button"
                  data-aos="zoom-in"
                >
                  Manage Notifications
                </button>
              </div>
              
              <div className="action-panel" data-aos="fade-up" data-aos-delay="100">
                <div className="panel-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <h2>Post Company Requirements</h2>
                <p>Enter details about company requirements and necessary criteria</p>
                <button
                  onClick={handlePostCompanyDetails}
                  className="action-button"
                  data-aos="zoom-in"
                >
                  Manage Companies
                </button>
              </div>
              
              <div className="action-panel" data-aos="fade-up" data-aos-delay="200">
                <div className="panel-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </div>
                <h2>Handle Student Queries</h2>
                <p>Respond to questions from students</p>
                <button
                  onClick={() => setActiveTab('queries')}
                  className="action-button"
                  data-aos="zoom-in"
                >
                  View Queries
                </button>
              </div>
            </div>

            <div className="section statistics-section" data-aos="fade-up">
              <h2>Placement Statistics</h2>
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-number">95%</div>
                  <div className="stat-title">Placement Rate</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">120+</div>
                  <div className="stat-title">Companies Visited</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">42 LPA</div>
                  <div className="stat-title">Highest Package</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">12.8 LPA</div>
                  <div className="stat-title">Average Package</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'notifications' && (
          <NotificationForm />
        )}

        {activeTab === 'companies' && (
          <div className="section" data-aos="fade-up">
            <h2>Manage Company Details</h2>
            <p>Add and manage company recruitment information.</p>
            <button
              onClick={handlePostCompanyDetails}
              className="action-button"
              data-aos="zoom-in"
            >
              Post Company Details
            </button>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="section" data-aos="fade-up">
            <h2>Student Queries</h2>
            <p>View and respond to queries from students.</p>
            <div className="query-list">
              <div className="empty-state">
                <p>No pending queries at the moment</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default PrIrDash;