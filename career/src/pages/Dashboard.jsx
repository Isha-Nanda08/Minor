import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Alert, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';  // Create this file to apply custom CSS

const Dashboard = () => {
  // States for filters
  const [stream, setStream] = useState('');
  const [postType, setPostType] = useState('');
  const [program, setProgram] = useState('');
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Handle filter changes
  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleProgramChange = (event) => {
    setProgram(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="container3 mt-4">
        <motion.h1 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
          Company Dashboard Details
        </motion.h1>
      </div>
      <marquee className="marquee-text">
        New Companies For Different Streams In Institute. Do Check It!!!
      </marquee>
      <div className='filters container' style={{ height: "90px" }}>
                <div className="row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="col col-sm-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <select >
                            <option value="Select Stream">Select Stream</option>
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
                            <option value="Mathematics
                            ">Mathematics
                            </option>
                        </select>
                        <select>
                            <option value="Select Post Type">Select Post Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="6 Months Intern + FTE">6 Months Intern + FTE</option>
                            <option value="6 Months Internship">6 Months Internship</option>
                            <option value="2 Months Internship">2 Months Internship</option>
                        </select>
                        <select>
                            <option value="Select Program">Select Program</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="MBA">MBA</option>
                            <option value="M.Sc">M.Sc</option>
                        </select>
                    </div>
                </div>
            </div>
      
      <Stack sx={{ width: '90%' }} spacing={2} className="alert-container">
        <Alert icon={<CalendarMonthIcon />} severity="info">
          <strong>{monthNames[new Date().getMonth()]}, {new Date().getFullYear()}</strong> Visiting Companies In This Month - <strong>Check It Out!</strong>
        </Alert>
      </Stack>
      {/* Optional: Company details can go here */}
    </div>
  );
};

export default Dashboard;
