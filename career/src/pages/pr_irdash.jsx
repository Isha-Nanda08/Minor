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
  const [queries, setQueries] = useState([]);
  const [queriesLoading, setQueriesLoading] = useState(false);
  const [responseText, setResponseText] = useState({});
  const [submittingResponse, setSubmittingResponse] = useState({});
  const [responseStatus, setResponseStatus] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
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
          } else {
            // If authenticated as PR, fetch queries
            fetchQueries();
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

  // Fetch all queries
  const fetchQueries = async () => {
    setQueriesLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.get('/api/queries/all', config);
      
      if (response.data && response.data.queries) {
        console.log("Queries fetched:", response.data.queries);
        setQueries(response.data.queries);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setQueriesLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  // Handle response text change
  const handleResponseChange = (queryId, text) => {
    setResponseText(prev => ({
      ...prev,
      [queryId]: text
    }));
  };

  // Submit response to a query
  // Submit response to a query
// Submit response to a query
// Submit response to a query
const handleSubmitResponse = async (queryId) => {
  if (!responseText[queryId] || responseText[queryId].trim() === '') return;
  
  setSubmittingResponse(prev => ({
    ...prev,
    [queryId]: true
  }));
  
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    // Send the text directly with a clear parameter name
    const response = await api.put(`/api/queries/${queryId}/respond`, {
      answerText: responseText[queryId],
      status: 'answered'
    }, config);
    
    if (response.data && response.data.success) {
      console.log("Response submitted successfully:", response.data);
      
      // Make sure the local state is updated with the format returned from the server
      if (response.data.query) {
        // Replace the entire query object with the one from the server response
        setQueries(prevQueries => 
          prevQueries.map(q => 
            q._id === queryId ? response.data.query : q
          )
        );
      } else {
        // Fallback to local update if server doesn't return the updated query
        setQueries(prevQueries => 
          prevQueries.map(q => 
            q._id === queryId 
              ? {
                  ...q,
                  status: 'answered',
                  answer: {
                    text: responseText[queryId],
                    answeredAt: new Date().toISOString()
                  }
                } 
              : q
          )
        );
      }
      
      setResponseStatus(prev => ({
        ...prev,
        [queryId]: {
          success: true,
          message: 'Response submitted successfully!'
        }
      }));
      
      // Clear response text
      setResponseText(prev => ({
        ...prev,
        [queryId]: ''
      }));
      
      // Add animation class to the query card
      setTimeout(() => {
        const queryCard = document.getElementById(`query-card-${queryId}`);
        if (queryCard) {
          queryCard.classList.add('status-changed');
          setTimeout(() => {
            queryCard.classList.remove('status-changed');
          }, 2000); // 2s matches the animation duration
        }
      }, 100);
    }
  } catch (error) {
    console.error("Error submitting response:", error);
    setResponseStatus(prev => ({
      ...prev,
      [queryId]: {
        success: false,
        message: 'Failed to submit response. Please try again.'
      }
    }));
  } finally {
    setSubmittingResponse(prev => ({
      ...prev,
      [queryId]: false
    }));
    
    // Clear status message after 3 seconds
    setTimeout(() => {
      setResponseStatus(prev => {
        const newStatus = {...prev};
        delete newStatus[queryId];
        return newStatus;
      });
    }, 3000);
  }
};

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    <div className="prdashboard-container">
      {/* Header matching the homepage */}
      <div className="prdashboard-header">
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
          {queries.filter(q => q.status === 'pending').length > 0 && (
            <span className="notification-badge">{queries.filter(q => q.status === 'pending').length}</span>
          )}
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
              {queries.filter(q => q.status === 'pending').length > 0 && (
                <div className="alert-banner">
                  <p>You have {queries.filter(q => q.status === 'pending').length} pending student queries waiting for your response.</p>
                  <button 
                    onClick={() => setActiveTab('queries')}
                    className="action-button small"
                  >
                    View Queries
                  </button>
                </div>
              )}
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
                  {queries.filter(q => q.status === 'pending').length > 0 && (
                    <span className="badge">{queries.filter(q => q.status === 'pending').length}</span>
                  )}
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
          <div className="section queries-section" data-aos="fade-up">
            <h2>Student Queries</h2>
            <p>View and respond to queries from students.</p>
            
            <div className="query-filters">
              <button 
                className={`filter-button ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All Queries
              </button>
              <button 
                className={`filter-button ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => handleFilterChange('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-button ${filterStatus === 'answered' ? 'active' : ''}`}
                onClick={() => handleFilterChange('answered')}
              >
                Answered
              </button>
            </div>
            
            {queriesLoading ? (
              <div className="loading-container small">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading queries...</div>
              </div>
            ) : queries.length > 0 ? (
              <div className="query-list">
                {queries
                  .filter(query => filterStatus === 'all' || query.status === filterStatus)
                  .map(query => (
                    <div 
                      key={query._id} 
                      id={`query-card-${query._id}`}
                      className={`query-card ${query.status}`} 
                      data-aos="fade-up"
                    >
                      <div className="query-header">
                        <div className="query-meta">
                          <span className="student-name">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            {query.studentName || 'Student'}
                          </span>
                          <span className="query-date">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            {formatDate(query.createdAt)}
                          </span>
                        </div>
                        <div className={`status-badge ${query.status}`}>
                          {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="query-content">
                        <p>{query.text}</p>
                      </div>
                      
                      {query.answer && (
                        <div className="query-response">
                          <h4>Your Response:</h4>
                          {/* Access the text property of the answer object */}
                          <p>{typeof query.answer === 'object' ? query.answer.text : query.answer}</p>
                          <div className="response-date">
                            {/* Make sure we're accessing the date correctly */}
                            Answered on {
                              query.answer.answeredAt 
                              ? formatDate(query.answer.answeredAt) 
                              : (query.answeredAt ? formatDate(query.answeredAt) : 'N/A')
                            }
                          </div>
                        </div>
                      )}
                      {query.status === 'pending' && (
                        <div className="query-reply-form">
                          <h4>Reply to this query:</h4>
                          <textarea
                            placeholder="Type your response here..."
                            value={responseText[query._id] || ''}
                            onChange={(e) => handleResponseChange(query._id, e.target.value)}
                          ></textarea>
                          
                          <div className="form-actions">
                            <button 
                              className="submit-response-btn"
                              onClick={() => handleSubmitResponse(query._id)}
                              disabled={submittingResponse[query._id] || !responseText[query._id] || responseText[query._id].trim() === ''}
                            >
                              {submittingResponse[query._id] ? 'Submitting...' : 'Submit Response'}
                            </button>
                            
                            {responseStatus[query._id] && (
                              <div className={`response-status ${responseStatus[query._id].success ? 'success' : 'error'}`}>
                                {responseStatus[query._id].message}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="empty-icon"><circle cx="12" cy="12" r="10"></circle><path d="M8 15h8"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>
                <p>No queries {filterStatus !== 'all' ? `with status "${filterStatus}"` : ''} at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrIrDash;