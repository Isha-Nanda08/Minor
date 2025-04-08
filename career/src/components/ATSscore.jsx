import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct usage
import '../styles/fileUpload.css';

const ATSscore = () => {
  const navigate = useNavigate();

  return (
    <div className="file-upload-container">
      <h2>CHECK YOUR ATS SCORE NOW</h2>
      <form>
        <button
          type="button"
          onClick={() => (window.location.href = "https://huggingface.co/spaces/manish917/ai_resume_parser")}
        >
          CHECK
        </button>
      </form>
    </div>
  );
};

export default ATSscore;
