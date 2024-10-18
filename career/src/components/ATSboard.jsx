import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import '../styles/ATSboard.css';

const ResumeChecker = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="resume-checker-container">
      {/* Left Section - Heading & Upload Area */}
      <div className="left-section" data-aos="fade-right">
        <h3 className="heading">Resume Checker</h3>
        <h1>Is your resume good enough?</h1>
        <p>A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.</p>
        <div className="upload-section" data-aos="fade-up">
          <p>Drop your resume here or choose a file. PDF & DOCX only. Max 2MB file size.</p>
          <button className="upload-btn">Upload Your Resume</button>
          <p className="privacy-text">Privacy guaranteed</p>
        </div>
      </div>

      {/* Right Section - ATS Score */}
      <div className="right-section" data-aos="fade-left">
        <div className="score-container">
          <h2>Resume Score</h2>
          <div className="score-circle">
            <h3>92/100</h3>
            <p>24 Issues</p>
          </div>
          <ul className="score-details">
            <li>✔ ATS Parse Rate</li>
            <li>✔ Quantifying Impact</li>
            <li>✘ Repetition</li>
            <li>✘ Spelling & Grammar</li>
            <li>✔ Summarize Resume</li>
          </ul>
        </div>

        <div className="parse-rate-section" data-aos="fade-left">
          <h3>ATS Parse Rate</h3>
          <div className="parse-rate-bar">
            <div className="filled-bar" data-aos="fill-bar" data-aos-delay="600"></div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ResumeChecker;
