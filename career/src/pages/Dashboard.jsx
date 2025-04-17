// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Alert, Button, TextField, Paper, Typography, Snackbar } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";
import CompanyCalendar from "../components/CompanyCalender";
import api from "../Api";
import PlacementBulletin from "../components/student_bulletien";
import FAQ from "../components/FAQ";

const Dashboard = () => {
  const [stream, setStream] = useState("");
  const [postType, setPostType] = useState("");
  const [program, setProgram] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("stream"); // Default active tab
  const [query, setQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Check authentication and fetch user role
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
          if (role !== "student") {
            console.log("Not a student, redirecting...");
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

  // Handle query submission
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Here you would typically send the query to your backend
    console.log("Submitting query:", query);
    
    // For now, we'll just show a success message
    setSnackbarOpen(true);
    setQuery("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    console.log("Logging out...");
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Call the backend logout endpoint (optional with JWT)
    api.post('/api/auth/logout')
      .then(response => {
        console.log("Logout successful:", response.data);
      })
      .catch(error => console.error("Logout Error:", error));
    // Redirect to login page
    navigate("/login");
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <div className="container3 mt-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.2 }}
        >
          Company Dashboard Details
        </motion.h1>
        {userData && (
          <div className="user-welcome">
            <p>Welcome, {userData.name || userData.email}</p>
          </div>
        )}
      </div>

      <marquee className="marquee-text">New Companies For Different Streams In Institute. Do Check It!!!</marquee>

      <div className="dashboard-content-container">
        <div className="dashboard-row">
          <div className="bulletin-column">
            <PlacementBulletin />
          </div>
          <div className="calendar-column">
            <CompanyCalendar />
            <Alert icon={<CalendarMonthIcon />} severity="info" className="calendar-alert">
              <strong>{monthNames[new Date().getMonth()]}, {new Date().getFullYear()}</strong> Visiting Companies In This Month - <strong>Check It Out!</strong>
            </Alert>
          </div>
        </div>
        
        {/* New Query Section */}
        <motion.div 
          className="query-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FAQ/>
          <Paper elevation={3} className="query-paper">
            <div className="query-header">
              <HelpOutlineIcon className="query-icon" />
              <Typography variant="h5" component="h2">
                Have a Question?
              </Typography>
            </div>
            
            <Typography variant="body1" className="query-subheader">
              Submit your placement-related queries to the admin
            </Typography>
            
            <form onSubmit={handleQuerySubmit} className="query-form">
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Type your query here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="query-input"
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                endIcon={<SendIcon />}
                className="query-submit-btn"
                disabled={!query.trim()}
              >
                Submit Query
              </Button>
            </form>
          </Paper>
        </motion.div>
      </div>

      {/* Logout Button */}
      <div className="logout-container">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Your query has been submitted successfully!"
      />
    </div>
  );
};

export default Dashboard;