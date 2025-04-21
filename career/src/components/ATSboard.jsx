import React, { useState, useRef } from 'react';
import '../styles/ATSboard.css'; // Make sure you have corresponding CSS

// import React, { useState, useRef } from 'react';

const ATSboard = ({ onUpload, onDemoClick }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadError(null);
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file only');
      setSelectedFile(null);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="ats-board-container">
      <div className="ats-board-content">
        <h1>Resume ATS Checker</h1>
        <p>Upload your resume to check how well it performs against Applicant Tracking Systems</p>

        <div 
          className={`file-drop-area ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            id="resume-upload" 
            accept=".pdf"
            onChange={handleChange}
            className="file-input"
          />
          
          <div className="drop-message">
            <div className="upload-icon">
              {/* Icon SVG */}
            </div>
            <p className="drop-text">
              {selectedFile ? selectedFile.name : "Drag & drop your resume PDF or click to browse"}
            </p>
            {uploadError && <p className="error-text">{uploadError}</p>}
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="upload-btn primary"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Analyze Resume
          </button>
          <button 
            className="demo-btn secondary"
            onClick={onDemoClick}
          >
            View Demo Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ATSboard;