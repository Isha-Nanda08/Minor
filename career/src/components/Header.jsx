import React from 'react'
import '../styles/header.css'
// import '../../public/assets/images/logo_250.png'

const Header = () => {
  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="top-links">
          <a href="#">Jobs</a>
          <a href="#">Calendar</a>
          <a href="#">Tenders</a>
          <a href="#">Payment Gateway</a>
          <a href="#">Recruiters/Careers</a>
          <a href="#">IGES</a>
          <a href="#">ICC</a>
        </div>
        <div className="language-options">
          <a href="#">Hindi</a> / <a href="#">A-</a> <a href="#">A+</a>
          <a href="#">NITJ Email</a>
        </div>
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="/assets/images/logo_250.png" alt="Logo"  />
        </div>
        <div className="institute-name">
        <div class="slider">
	    <div class="caption">
		
		<div class="text-box">
			<div>NIT Jalandhar</div>
			<div>BE an Nitian</div>
		</div>
	</div>
</div>
        </div>

      <nav className="navbar">
        <ul>
          <li><a href="#">Academics</a></li>
          <li><a href="#">Admissions</a></li>
          <li><a href="#">For Students</a></li>
          <li><a href="#">For Faculty and Staff</a></li>
          <li><a href="#">Research</a></li>
          <li><a href="#">Alumni</a></li>
          <li><a href="#">Resources</a></li>
          <li><a href="#">Administration</a></li>
        </ul>
      </nav>
    </div>
    </header>
  )
}

export default Header