import React, { useEffect, useState } from 'react';
import '../styles/ATS.css';

const ResumeScoreDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mount
    setIsLoaded(true);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Left Panel */}
        <div className="left-panel">
          <h2 className="score-title">Resume Score</h2>
          
          <div className="score-gauge-container">
            <div className="score-gauge">
              <svg viewBox="0 0 120 120">
                <circle className="gauge-bg" cx="60" cy="60" r="54" />
                <circle 
                  className={`gauge-fill ${isLoaded ? 'animate' : ''}`} 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  strokeDasharray="339.292" 
                  strokeDashoffset="27.14" 
                />
              </svg>
              <div className="score-value">
                <span className="score-number">92</span>
                <span className="score-max">/100</span>
              </div>
            </div>
            <div className="issues-count">24 Issues</div>
          </div>
          
          <div className="categories">
            <div className="category-header">
              <span className="category-name">CONTENT</span>
              <span className="category-score green">90%</span>
              <span className="arrow">&#9650;</span>
            </div>
            
            <ul className="category-items">
              <li className="item success">
                <span className="check-icon">✓</span>
                ATS Parse Rate
              </li>
              <li className="item success">
                <span className="check-icon">✓</span>
                Quantifying Impact
              </li>
              <li className="item error">
                <span className="x-icon">✕</span>
                Repetition
              </li>
              <li className="item locked">
                <span className="lock-icon">🔒</span>
                Spelling & Grammar
              </li>
              <li className="item locked">
                <span className="lock-icon">🔒</span>
                Summarize Resume
              </li>
            </ul>
            
            <div className="category-header">
              <span className="category-name">FORMAT & BREVITY</span>
              <span className="category-score green">84%</span>
              <span className="arrow">&#9660;</span>
            </div>
            
            <div className="category-header">
              <span className="category-name">STYLE</span>
              <span className="category-score red">40%</span>
              <span className="arrow">&#9660;</span>
            </div>
            
            <div className="category-header">
              <span className="category-name">SECTIONS</span>
              <span className="category-score red">40%</span>
              <span className="arrow">&#9660;</span>
            </div>
            
            <div className="category-header">
              <span className="category-name">SKILLS</span>
              <span className="category-score yellow">68%</span>
              <span className="arrow">&#9660;</span>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="right-panel">
          <div className="content-header">
            <div className="content-title">
              <span className="content-icon">◉</span>
              CONTENT
            </div>
            <div className="issues-badge">8 ISSUES FOUND</div>
          </div>
          
          <div className="content-section">
            <div className="section-header">
              <span className="section-icon">⦾</span>
              <span className="section-title">ATS PARSE RATE</span>
              <span className="collapse-icon">&#9650;</span>
            </div>
            
            <div className="placeholder-lines">
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line short"></div>
            </div>
            
            <div className="progress-container">
              <div className={`progress-bar ${isLoaded ? 'animate' : ''}`}>
                <div className="marker"></div>
              </div>
            </div>
            
            <div className="placeholder-lines bottom">
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line short"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreDashboard;