import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/company_calendar.css';

const CompanyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [monthlyCompanies, setMonthlyCompanies] = useState([]);
  
  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a duration of 1200ms
    
    // Update monthly companies when the month changes
    updateMonthlyCompanies(date);
  }, []);
  
  // Mock data for companies and forms
  const companyData = {
    '2025-04-05': [{ company: 'Microsoft', link: 'http://apply-microsoft.com' }],
    '2025-04-10': [{ company: 'Google', link: 'http://apply-google.com' }],
    '2025-04-15': [{ company: 'Amazon', link: 'http://apply-amazon.com' }],
    '2025-04-21': [{ company: 'Apple', link: 'http://apply-apple.com' }],
    '2025-04-25': [{ company: 'Meta', link: 'http://apply-meta.com' }],
    '2025-05-03': [{ company: 'Netflix', link: 'http://apply-netflix.com' }],
    '2025-03-28': [{ company: 'IBM', link: 'http://apply-ibm.com' }],
  };
  
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    
    // When the date changes to a new month, update monthly companies
    if (selectedDate.getMonth() !== date.getMonth()) {
      updateMonthlyCompanies(selectedDate);
    }
  };
  
  // Get all companies for the current month
  const updateMonthlyCompanies = (currentDate) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const companiesThisMonth = [];
    
    // Loop through all dates in companyData
    for (const dateKey in companyData) {
      const dateObj = new Date(dateKey);
      
      // Check if the date is in the current month and year
      if (dateObj.getMonth() === currentMonth && dateObj.getFullYear() === currentYear) {
        companyData[dateKey].forEach(company => {
          companiesThisMonth.push({
            ...company,
            date: new Date(dateKey).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })
          });
        });
      }
    }
    
    setMonthlyCompanies(companiesThisMonth);
  };
  
  // Get companies for selected date
  const formattedDate = date.toISOString().split('T')[0];
  const selectedDateCompanies = companyData[formattedDate] || [];
  
  // Function to highlight dates with companies
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      if (companyData[formattedDate]) {
        return 'has-company';
      }
    }
    return null;
  };
  
  // Get month name
  const currentMonthName = date.toLocaleString('default', { month: 'long' });
  
  return (
    <div className="calendar-container" data-aos="fade-up">
      <h2 className="calendar-heading">Company Calendar</h2>
      
      <Calendar 
        onChange={handleDateChange} 
        value={date} 
        className="styled-calendar" 
        tileClassName={tileClassName}
      />
      
      <div className="calendar-content">
        <div className="selected-date-companies" data-aos="fade-right">
          <h3 className="date-heading">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          {selectedDateCompanies.length > 0 ? (
            selectedDateCompanies.map((company, index) => (
              <div key={index} className="company-item" data-aos="fade-in">
                <h4>{company.company}</h4>
                <a 
                  href={company.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="apply-button"
                >
                  Apply Now
                </a>
              </div>
            ))
          ) : (
            <p className="no-companies">No companies are visiting on this date.</p>
          )}
        </div>
        
        <div className="monthly-companies-section" data-aos="fade-up">
          <h3 className="monthly-heading">Companies Visiting in {currentMonthName}</h3>
          
          {monthlyCompanies.length > 0 ? (
            <div className="monthly-companies-grid">
              {monthlyCompanies.map((company, index) => (
                <div key={index} className="monthly-company-item" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="company-card">
                    <div className="company-logo">{company.company.charAt(0)}</div>
                    <h4>{company.company}</h4>
                    <p className="visit-date">{company.date}</p>
                    <a 
                      href={company.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="apply-button"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-companies">No companies are visiting this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCalendar;