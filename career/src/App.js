import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ATSPage from "./pages/ATSPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PlacementCellApproval from "./pages/PlacementCellApproval";
import Pr_ir from "./pages/Pr_ir";
import PrIrDash from "./pages/pr_irdash";
import PrSubmitNotification from "./pages/PrSubmitNotification";
import Login from "./pages/Login";
import Loginstudent from "./pages/Loginstudent";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ats-page" element={<ATSPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placement-cell-approval" element={<PlacementCellApproval />} />
          <Route path="/pr-ir" element={<Pr_ir />} />
          <Route path="/pr-ir-dashboard" element={<PrIrDash />} />
          <Route path="/pr-submit-notification" element={<PrSubmitNotification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginstudent" element={<Loginstudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
