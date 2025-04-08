import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/pr_irdash.css';
import Footer from '../components/Footer';
import api from '../Api'; // Make sure to import your API client

const PrIrDash = () => {
  const [approvedNotifications, setApprovedNotifications] = useState([]);
  const [studentQuestions, setStudentQuestions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication check should be in useEffect
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
          // Check if user is PR rather than student
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
    AOS.init({ duration: 1000 });

    const approvedList = JSON.parse(localStorage.getItem('approvedList')) || [];
    setApprovedNotifications(approvedList);

    // Example of student questions
    const questions = [
      { question: 'What are the upcoming companies?', student: 'John Doe' },
      { question: 'How to prepare for XYZ company?', student: 'Jane Doe' },
    ];
    setStudentQuestions(questions);
  }, []);

  // Redirect function for posting company details
  const handlePostCompanyDetails = () => {
    navigate('/companies');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="section" data-aos="fade-up">
        <h2>Approved Notifications</h2>
        <div className="horizontal-scroll-container">
          <div className="scroll-content">
            {approvedNotifications.map((info, index) => (
              <div key={index} className="info" data-aos="fade-right">
                <div className="desc">{info.desc}</div>
                <div className="pr-name">{info.name}</div>
                <div className="branch">{info.branch}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section" data-aos="fade-up">
        <h2>Post a Notification</h2>
        <button
          onClick={() => navigate('/pr-submit-notification')}
          className="post-notification-btn"
          data-aos="zoom-in"
        >
          Post Notification
        </button>
      </div>
      
      <div className="section" data-aos="fade-up">
        <h2>Post Company Requirements</h2>
        <p>Enter details about company requirements and necessary criteria.</p>
        <button
          onClick={handlePostCompanyDetails}
          className="post-company-details-btn"
          data-aos="zoom-in"
        >
          Post Company Details
        </button>
      </div>

      <div className="section" data-aos="fade-up">
        <h2>Raise a Query</h2>
        <form className="query-form">
          <textarea placeholder="Type your query here..." rows="4"></textarea>
          <button type="submit" className="raise-query-btn">Raise Query</button>
        </form>
      </div>
    </div>
  );
};

export default PrIrDash;