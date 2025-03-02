import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Grid, Select, MenuItem, FormControl, InputLabel, Alert, Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import "../styles/Dashboard.css"; // Make sure you have this file
import CompanyCalendar from "../components/CompanyCalender";
import Eligible from "../components/Eligible";

const Dashboard = () => {
  const [stream, setStream] = useState("");
  const [postType, setPostType] = useState("");
  const [program, setProgram] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const instituteId = [22124045];

  // Check authentication and fetch user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
  
          console.log("User UID:", user.uid); // Debug UID
          console.log("User Data:", userSnap.exists() ? userSnap.data() : "No data found");
  
          if (userSnap.exists()) {
            const role = userSnap.data().role;
            console.log("Fetched Role:", role);
  
            setUserRole(role);
            if (role !== "student") {
              console.log("Not a student, redirecting...");
              navigate("/login");
            }
          } else {
            console.log("❌ No user data found in Firestore");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          navigate("/login");
        }
      } else {
        console.log("No authenticated user, redirecting...");
        navigate("/login");
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [auth, db, navigate]);
  
  

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>; // Show a loading state

  return (
    <div className="dashboard">
      <div className="container3 mt-4">
        <motion.h1 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
          Company Dashboard Details
        </motion.h1>
      </div>

      <marquee className="marquee-text">New Companies For Different Streams In Institute. Do Check It!!!</marquee>

      {/* <Eligible instituteId={instituteId} /> */}
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
