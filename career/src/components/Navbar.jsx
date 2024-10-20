import React from 'react'
import '../styles/header.css'


const Navbar= () => {
    
        const handleDropdown = () => {
          const dropdown = document.querySelector('.dropdown-content');
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        };
    
  return (
    <>
        <div className="top-bar">
        <div className="top-links">
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/ats-page">ATS score</a>
          <a href="#">Contact</a>
          <a href="#">Alumini</a>
          <a href="#">More</a>
          <div className="dropdown">
            <button className="dropbtn" onClick={handleDropdown}>Login</button>
            <div className="dropdown-content">
            <a href="/loginstudent">Login as Student</a>
            <a href="/login">Login as PR/IR</a>
            <a href="/login-placement-cell">Login as Placement Cell</a>
            </div>
          </div>
        </div>
        <div className="language-options">
          <a href="#">Hindi</a> / <a href="#">A-</a> <a href="#">A+</a>
          <a href="#">NITJ Email</a>
        </div>
      </div>
    </>
  )

}
export default Navbar;

