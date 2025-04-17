import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
import Header from "./components/Header";
import ATSPage from "./pages/ATSPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PlacementCellApproval from "./pages/PlacementCellApproval";
import Pr_ir from "./pages/Pr_ir";
import PrIrDash from "./pages/pr_irdash";
import PrSubmitNotification from "./pages/PrSubmitNotification";
import Login from "./pages/Login";
import LoginStudent from "./pages/Loginstudent";
import Navbar from "./components/Navbar";
import CompanyCalendar from "./components/CompanyCalender";
import StudentRegister from "./pages/StudentRegister";
// import CompanyUpload from "./pages/CompanyUpload";
import AlumniPage from "./pages/AluminiPage";
import About from "./components/About";
import Footer from "./components/Footer";
import CompanyUploadForm from "./pages/CompanyUpload";
// import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Navbar/>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ats-page" element={<ATSPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placement-cell-approval" element={<PlacementCellApproval />} />
          <Route path="/pr-ir" element={<Pr_ir />} />
          {/* <Route path="/pr-ir-dashboard" element={<PrIrDash />} /> */}
          <Route path="/pr-submit-notification" element={<PrSubmitNotification />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/loginstudent" element={<LoginStudent />} /> */}
          <Route path="/calender" element={<CompanyCalendar />} />
          <Route path="/register" element={<StudentRegister/>} />
          <Route path="/companies" element={<CompanyUploadForm/>} />
          <Route path="/forum" element={<AlumniPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<LoginStudent />} />
          <Route path="/ir_prdash" element={<PrIrDash />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        </Routes>

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
