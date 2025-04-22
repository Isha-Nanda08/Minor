import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Bulletin", path: "/bulletin" },
    { title: "Calendar", path: "/calendar" },
    { title: "FAQ", path: "/faq" },
    { title: "Queries", path: "/queries" }
  ];
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close mobile menu after navigation
  };
  
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo" onClick={() => handleNavigation('/dashboard')}>
          <img src="/api/placeholder/40/40" alt="Logo" className="logo-img" />
          <h1>PlacementPortal</h1>
        </div>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <div 
              key={index}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.title}
            </div>
          ))}
        </div>
        
        <div className="navbar-right">
          <div className="user-profile">
            <img src="/api/placeholder/32/32" alt="User" className="profile-img" />
            <span className="user-name">Student</span>
          </div>
          
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .navbar-logo h1 {
          font-size: 20px;
          margin-left: 12px;
          font-weight: 600;
          color: #0077b6;
        }
        
        .logo-img {
          border-radius: 8px;
        }
        
        .navbar-links {
          display: flex;
          gap: 30px;
        }
        
        .nav-item {
          font-size: 16px;
          font-weight: 500;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .nav-item:hover {
          background-color: #f0f7ff;
          color: #0077b6;
        }
        
        .nav-item.active {
          color: #0077b6;
          font-weight: 600;
        }
        
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #0077b6;
          border-radius: 3px;
        }
        
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        
        .user-profile:hover {
          background-color: #f0f7ff;
        }
        
        .profile-img {
          border-radius: 50%;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        
        .bar {
          width: 24px;
          height: 3px;
          background-color: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        .bar.change:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .bar.change:nth-child(2) {
          opacity: 0;
        }
        
        .bar.change:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
          .navbar-links {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background-color: white;
            padding: 20px;
            gap: 15px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: -1;
          }
          
          .navbar-links.active {
            transform: translateY(0);
            opacity: 1;
            z-index: 1;
          }
          
          .nav-item.active::after {
            bottom: -3px;
          }
          
          .hamburger {
            display: flex;
          }
          
          .user-name {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentNav;