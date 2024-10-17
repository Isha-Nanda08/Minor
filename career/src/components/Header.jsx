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
        <div className="header-content">
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
        </div>

      <nav className="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">ATS score</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Alumni</a></li>
          <li><a href="#">More</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>
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