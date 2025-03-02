import React, { useEffect } from 'react';
import '../styles/header.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Briefcase, FileText, Users, GraduationCap } from 'lucide-react';

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS and set animation duration
  }, []);

  return (
    <header className="header-container">
      <div className="main-header">
        <div className="header-content">
          <div className="logo">
            <img src="/assets/images/logo_250.png" alt="Logo" />
          </div>
          <div className="institute-name">
            <div className="slider">
              <div className="caption">
                <div className="text-box">
                  <div>Dr. B.R. Ambedkar National Institute of Technology, Jalandhar</div>
                  <div>डॉ बी आर अंबेडकर राष्ट्रीय प्रौद्योगिकी संस्थान जालंधर</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="name">
          <div className="web">
            <p className="webname">Career Connect</p>
            <p className="webdesc">
              A portal by NIT Jalandhar providing statistics on institute placements, upcoming opportunities, 
              and a way for students to contact TPO, PRs, and IRs.
            </p>
          </div>
        </div>

        <div className="info-sections">
          <div className="info-card research" data-aos="fade-right">
            <h3>PLACEMENTS</h3>
            <Briefcase size={40} />
          </div>
          <div className="info-card startups" data-aos="fade-right" data-aos-delay="200">
            <h3>INTERNSHIPS</h3>
            <GraduationCap size={40} />
          </div>
          <div className="info-card news" data-aos="fade-right" data-aos-delay="400">
            <h3>WHY RECRUIT?</h3>
            <FileText size={40} />
          </div>
          <div className="info-card abu-dhabi" data-aos="fade-right" data-aos-delay="600">
            <h3>PEOPLE</h3>
            <Users size={40} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
