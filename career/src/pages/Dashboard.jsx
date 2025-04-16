// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Select, MenuItem, FormControl, InputLabel, Alert, Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";
import CompanyCalendar from "../components/CompanyCalender";
import Eligible from "../components/Eligible";
import api from "../Api";
import StudentBulletin from "../components/student_bulletien";

const Dashboard = () => {
  const [stream, setStream] = useState("");
  const [postType, setPostType] = useState("");
  const [program, setProgram] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
          navigate("/login"); // Redirecting to login instead of profile
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
        <motion.h1 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
          Company Dashboard Details
        </motion.h1>
        {userData && (
          <div className="user-welcome">
            <p>Welcome, {userData.name || userData.email}</p>
          </div>
        )}
      </div>

      <marquee className="marquee-text">New Companies For Different Streams In Institute. Do Check It!!!</marquee>

      <CompanyCalendar />

      <div className="filters container" style={{ height: "90px" }}>
        <div className="row" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <div className="col col-sm-12" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <select onChange={(e) => setStream(e.target.value)}>
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
            <select onChange={(e) => setPostType(e.target.value)}>
              <option value="">Select Post Type</option>
              <option value="Full Time">Full Time</option>
              <option value="6 Months Intern + FTE">6 Months Intern + FTE</option>
              <option value="6 Months Internship">6 Months Internship</option>
              <option value="2 Months Internship">2 Months Internship</option>
            </select>
            <select onChange={(e) => setProgram(e.target.value)}>
              <option value="">Select Program</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="M.Sc">M.Sc</option>
            </select>
          </div>
        </div>
      </div>

      <Stack sx={{ width: "90%" }} spacing={2} className="alert-container">
        {/* <div><</div> */}
        <StudentBulletin/>
        <Alert icon={<CalendarMonthIcon />} severity="info">
          <strong>{monthNames[new Date().getMonth()]}, {new Date().getFullYear()}</strong> Visiting Companies In This Month - <strong>Check It Out!</strong>
        </Alert>
      </Stack>

      {/* Logout Button */}
      <div className="logout-container" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;