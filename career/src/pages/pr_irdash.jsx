import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/pr_irdash.css';

const PrIrDash = () => {
  const [approvedNotifications, setApprovedNotifications] = useState([]);
  const [studentQuestions, setStudentQuestions] = useState([]); // Dummy student questions data

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const approvedList = JSON.parse(localStorage.getItem('approvedList')) || [];
    setApprovedNotifications(approvedList);

    // Example of student questions
    const questions = [
      { question: 'What are the upcoming companies?', student: 'John Doe' },
      { question: 'How to prepare for XYZ company?', student: 'Jane Doe' },
    ];
    setStudentQuestions(questions);
  }, []);

  return (
    <div className="dashboard">
      <div className="section" data-aos="fade-up">
        <h2>Approved Notifications</h2>
        <div className="horizontal-scroll-container">
          <div className="scroll-content">
            {approvedNotifications.map((info, index) => (
              <div key={index} className="info" data-aos="fade-right">
                <div className="desc">{info.desc}</div>
                <div className="pr-name">{info.name}</div>
                <div className="branch">{info.branch}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section" data-aos="fade-left">
        <h2>Questions from Students</h2>
        <div className="questions-container">
          {studentQuestions.map((question, index) => (
            <div key={index} className="question" data-aos="fade-up">
              <div className="student-name">{question.student}</div>
              <div className="student-question">{question.question}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" data-aos="fade-up">
        <h2>Post a Notification</h2>
        <button onClick={() => window.location.href = '/pr-submit-notification'} className="post-notification-btn" data-aos="zoom-in">Post Notification</button>
      </div>

      <div className="section" data-aos="fade-up">
        <h2>Raise a Query</h2>
        <form className="query-form">
          <textarea placeholder="Type your query here..." rows="4"></textarea>
          <button type="submit" className="raise-query-btn">Raise Query</button>
        </form>
      </div>
    </div>
  );
};

export default PrIrDash;
