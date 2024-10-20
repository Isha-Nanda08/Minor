import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/pr-irboard.css';

const Prboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleNavigation = (route) => {
    navigate(route); // Navigate to the passed route
  };

  return (
    <div className="choose" data-aos="fade-up">
      <div className="options">
        <div 
          className="pr" 
          data-aos="fade-right"
          onClick={() => handleNavigation('/pr-ir-dashboard')} // Navigate to PR dashboard on click
        >
          Placement Representative
        </div>
        <div 
          className="ir" 
          data-aos="fade-left"
          onClick={() => handleNavigation('/pr-ir-dashboard')} // Navigate to IR dashboard on click
        >
          Internship Representative
        </div>
      </div>
    </div>
  );
};

export default Prboard;
