import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/company_calendar.css'; // Add your custom CSS for styling

const CompanyCalendar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a duration of 1200ms
  }, []);

  // Mock data for companies and forms
  const companyData = {
    '2024-10-21': [{ company: 'Company A', link: 'http://applyA.com' }],
    '2024-10-22': [{ company: 'Company B', link: 'http://applyB.com' }],
    '2024-10-23': [{ company: 'Company C', link: 'http://applyC.com' }],
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const formattedDate = date.toISOString().split('T')[0];
  const companies = companyData[formattedDate] || [];

  return (
    <div className="calendar-container" data-aos="fade-up">
      <h2 className="calendar-heading">Select a Date to View Companies</h2>
      <Calendar onChange={handleDateChange} value={date} className="styled-calendar" />

      <div className="company-list" data-aos="fade-right">
        {companies.length > 0 ? (
          companies.map((company, index) => (
            <div key={index} className="company-item" data-aos="fade-in">
              <h3>{company.company}</h3>
              <a href={company.link} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p>No companies are visiting on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyCalendar;
