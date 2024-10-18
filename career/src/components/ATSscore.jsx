import React, { useState } from 'react';
import '../styles/fileUpload.css';

const ATSscore = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid PDF file.');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Placeholder upload function (replace with actual upload logic)
      setUploadStatus('Uploading...');
      // Simulating a delay for the upload
      setTimeout(() => {
        setUploadStatus('File uploaded successfully!');
        setSelectedFile(null);
      }, 2000);
    } else {
      setUploadStatus('Please select a PDF file to upload.');
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default ATSscore;
