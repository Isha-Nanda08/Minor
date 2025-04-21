import React from 'react';
import '../styles/fileUpload.css';

const ATSscore = ({ onCheckClick }) => {
  return (
    <div className="file-upload-container">
      <h2>CHECK YOUR ATS SCORE NOW</h2>
      <form>
        <button
          type="button"
          onClick={onCheckClick}
        >
          CHECK
        </button>
      </form>
    </div>
  );
};

export default ATSscore;