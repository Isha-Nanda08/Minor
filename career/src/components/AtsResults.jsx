import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import '../styles/ATSResults.css';

const ATSScoreResults = ({ results }) => {
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [activeTab, setActiveTab] = useState('score');
  
  // For demo purposes, you can remove this when integrating with real data
  useEffect(() => {
    if (!results) {
      // Demo data when no results are provided
      setScore({
        "ATS Score": "76",
        "Keyword Match": "70%",
        "Formatting Issues": "20%",
        "Work Experience Clarity": "85%",
        "Missing Sections": "15%",
        "Final Suggestions": "Your resume could benefit from more industry-specific keywords and clearer section formatting."
      });
      
      setSuggestions({
        "Skill Improvements": "Add more technical skills like Python, React, and data analysis. Highlight leadership abilities.",
        "Work Experience Enhancements": "Quantify your achievements with metrics. Include ROI or percentage improvements where possible.",
        "Formatting Suggestions": "Use bullet points consistently. Ensure consistent spacing between sections. Use a clean, ATS-friendly format.",
        "Certifications to Consider": "Adding AWS certification or project management credentials would strengthen your profile.",
        "General Feedback": "Your resume shows solid experience but needs stronger keywords and more quantifiable achievements to stand out."
      });
    } else {
      // Use actual results when provided
      setScore(results.ats_score);
      setSuggestions(results.resume_suggestions);
    }
  }, [results]);

  if (!score || !suggestions) {
    return <div className="loading">Loading results...</div>;
  }

  const scoreValue = parseInt(score["ATS Score"]);

  return (
    <div className="ats-results-container">
      <div className="results-header">
        <h2>Your ATS Analysis Results</h2>
        <p>Here's how your resume performs against Applicant Tracking Systems</p>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'score' ? 'active' : ''} 
          onClick={() => setActiveTab('score')}
        >
          Score Breakdown
        </button>
        <button 
          className={activeTab === 'suggestions' ? 'active' : ''} 
          onClick={() => setActiveTab('suggestions')}
        >
          Improvement Suggestions
        </button>
      </div>

      {activeTab === 'score' ? (
        <motion.div 
          className="score-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="score-circle-container">
            <div className="score-circle">
              <CircularProgressbar
                value={scoreValue}
                text={`${scoreValue}/100`}
                styles={buildStyles({
                  pathColor: scoreValue >= 80 ? '#22c55e' : scoreValue >= 60 ? '#f59e0b' : '#ef4444',
                  textColor: '#333',
                  trailColor: '#d9d9d9',
                })}
              />
            </div>
            <div className="score-status">
              {scoreValue >= 80 ? (
                <span className="excellent">Excellent</span>
              ) : scoreValue >= 60 ? (
                <span className="good">Good</span>
              ) : (
                <span className="needs-work">Needs Work</span>
              )}
            </div>
          </div>

          <div className="metrics-container">
            <div className="metrics-header">
              <h3>ATS Score Breakdown</h3>
              <p>How your resume performs in key areas</p>
            </div>
            
            <div className="metrics">
              <div className="metric">
                <div className="metric-label">Keyword Match</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: score["Keyword Match"] }}
                  ></div>
                </div>
                <div className="metric-value">{score["Keyword Match"]}</div>
              </div>
              
              <div className="metric">
                <div className="metric-label">Work Experience Clarity</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: score["Work Experience Clarity"] }}
                  ></div>
                </div>
                <div className="metric-value">{score["Work Experience Clarity"]}</div>
              </div>
              
              <div className="metric">
                <div className="metric-label">Formatting Issues</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill warning" 
                    style={{ width: score["Formatting Issues"] }}
                  ></div>
                </div>
                <div className="metric-value">{score["Formatting Issues"]}</div>
              </div>
              
              <div className="metric">
                <div className="metric-label">Missing Sections</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill warning" 
                    style={{ width: score["Missing Sections"] }}
                  ></div>
                </div>
                <div className="metric-value">{score["Missing Sections"]}</div>
              </div>
            </div>
            
            <div className="final-suggestions">
              <h4>Final Assessment</h4>
              <p>{score["Final Suggestions"]}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="suggestions-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="suggestions-grid">
            <div className="suggestion-card">
              <div className="card-header">
                <span className="card-icon">💪</span>
                <h3>Skill Improvements</h3>
              </div>
              <p>{suggestions["Skill Improvements"]}</p>
            </div>
            
            <div className="suggestion-card">
              <div className="card-header">
                <span className="card-icon">📈</span>
                <h3>Work Experience</h3>
              </div>
              <p>{suggestions["Work Experience Enhancements"]}</p>
            </div>
            
            <div className="suggestion-card">
              <div className="card-header">
                <span className="card-icon">📝</span>
                <h3>Formatting Suggestions</h3>
              </div>
              <p>{suggestions["Formatting Suggestions"]}</p>
            </div>
            
            <div className="suggestion-card">
              <div className="card-header">
                <span className="card-icon">🏆</span>
                <h3>Recommended Certifications</h3>
              </div>
              <p>{suggestions["Certifications to Consider"]}</p>
            </div>
          </div>
          
          <div className="general-feedback">
            <h3>General Feedback</h3>
            <div className="feedback-box">
              <p>{suggestions["General Feedback"]}</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn primary">Download Full Report</button>
            <button className="action-btn secondary">Book Resume Review</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ATSScoreResults;