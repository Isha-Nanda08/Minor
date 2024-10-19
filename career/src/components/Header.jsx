import React from 'react'
import '../styles/header.css'
// import '../../public/assets/images/logo_250.png'

const Header = () => {
  const handleDropdown = () => {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  };
  
  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="top-links">
          <a href="#">Home</a>
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

      <div className="main-header">
        <div className="header-content">
        <div className="logo">
          <img src="/assets/images/logo_250.png" alt="Logo"  />
        </div>
        <div className="institute-name">
        <div class="slider">
	    <div class="caption">
		
		<div class="text-box">
			<div>Dr. B.R. Ambedkar National Institute of Technology,Jalandhar</div>
			<div>डॉ बी आर अंबेडकर राष्ट्रीय प्रौद्योगिकी संस्थान जालंधर</div>
		</div>
	</div>
    </div>
</div>
        </div>

      
      <div className="name">
        <div className="web">
            <p class="webname">carrer connect</p>
            <p class="webdesc">A portal by NIT Jalandhar which provides all the information regarding the statistics about
                institute's placements and updates students with upcoming opportunities
                and also provides students to contact TPO, PRs and IRs.
            </p>
        </div>
      </div>
      <div className="info-sections">
        <div className="info-card research">
          <h3>PLACEMENTS</h3>
          <img src="/assets/icons/research-icon.png" alt="Research Icon" />
          {/* <p>Mapping the Innovations</p> */}
        </div>
        <div className="info-card startups">
          <h3>INTERNSHIPS</h3>
          <img src="/assets/icons/startups-icon.png" alt="Startups Icon" />
          {/* <p>Success stories of researchers</p> */}
        </div>
        <div className="info-card news">
          <h3>WHY RECRUIT?</h3>
          <img src="/assets/icons/news-icon.png" alt="News Icon" />
          {/* <p>Panorama of Events</p> */}
        </div>
        <div className="info-card abu-dhabi">
          <h3>PEOPLE</h3>
          <img src="/assets/icons/abu-dhabi-icon.png" alt="Abu Dhabi Icon" />
          {/* <p>Innovate. Inspire. Transform. Discover</p> */}
        </div>
      </div>
    </div>
    </header>
  )
}

export default Header