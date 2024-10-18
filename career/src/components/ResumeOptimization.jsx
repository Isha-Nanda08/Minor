import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/ATSboard.css'

const ResumeOptimization = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="optimization-container">
      {/* Header Section */}
      <div className="header-section" data-aos="fade-up">
        <h2>Our AI-powered resume checker goes beyond typos and punctuation</h2>
        <p>We've built-in ChatGPT to help you create a resume that's tailored to the position you're applying for.</p>
      </div>

      {/* Resume Optimization Checklist */}
      <div className="checklist-section">
        <div className="checklist-header" data-aos="fade-up">
          <h3>Resume optimization checklist</h3>
          <p>
            We check for 16 crucial things across 5 different categories on your resume including content, file type,
            and keywords in the most important sections of your resume. Here’s a full list of the checks you’ll receive:
          </p>
        </div>

        {/* Checklist Boxes */}
        <div className="checklist-boxes">
          <div className="checklist-box" data-aos="fade-right">
            <h4>Content</h4>
            <ul>
              <li>✔ ATS parse rate</li>
              <li>✔ Repetition of words and phrases</li>
              <li>✔ Spelling and grammar</li>
              <li>✔ Quantifying impact in experience section with examples</li>
            </ul>
          </div>

          <div className="checklist-box" data-aos="fade-right">
            <h4>Format</h4>
            <ul>
              <li>✔ File format and size</li>
              <li>✔ Resume length</li>
              <li>✔ Long bullet points with suggestions on how to shorten</li>
            </ul>
          </div>

          <div className="checklist-box" data-aos="fade-right">
            <h4>Resume Sections</h4>
            <ul>
              <li>✔ Contact information</li>
              <li>✔ Essential sections</li>
              <li>✔ Personality showcase with tips on how to improve</li>
            </ul>
          </div>

          <div className="checklist-box" data-aos="fade-right">
            <h4>Skills Suggestion</h4>
            <ul>
              <li>✔ Hard skills</li>
              <li>✔ Soft skills</li>
            </ul>
          </div>

          <div className="checklist-box" data-aos="fade-right">
            <h4>Style</h4>
            <ul>
              <li>✔ Resume design</li>
              <li>✔ Email address</li>
              <li>✔ Usage of active voice</li>
              <li>✔ Usage of buzzwords and clichés</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeOptimization;
