import React from 'react';

const FAQ = () => {
  // Sample FAQ data
  const faqItems = [
    {
      id: 1,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 2,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 3,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 4,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 5,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 6,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 7,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    },
    {
      id: 8,
      question: "Can a student with backlogs be allowed to take six months internship?",
      category: "Student",
      answer: "Students who want to avail 6-months internship during their 8th semester must not have more than 3 backlogs."
    }
  ];

  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>Welcome to <span className="highlight">FAQ's</span></h1>
      </header>
      
      <div className="faq-grid">
        {faqItems.map(item => (
          <div key={item.id} className="faq-card">
            <h2>{item.question}</h2>
            <p className="category">({item.category})</p>
            <div className="answer-section">
              <h3>Answer</h3>
              <p>"{item.answer}"</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="ask-button-container">
        <button className="ask-button">Ask New Question</button>
      </div>
      
      <style jsx>{`
        .faq-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .faq-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .faq-header h1 {
          font-size: 32px;
          font-weight: bold;
        }
        
        .highlight {
          color: #0077b6;
        }
        
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .faq-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .faq-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .faq-card h2 {
          font-size: 18px;
          margin-bottom: 5px;
        }
        
        .category {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .answer-section h3 {
          color: #0077b6;
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        .answer-section p {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .ask-button-container {
          display: flex;
          justify-content: flex-end;
          position: fixed;
          bottom: 30px;
          right: 30px;
        }
        
        .ask-button {
          background-color: #0077b6;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 15px 25px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 119, 182, 0.3);
          transition: background-color 0.2s;
        }
        
        .ask-button:hover {
          background-color: #005b8a;
        }
      `}</style>
    </div>
  );
};

export default FAQ;