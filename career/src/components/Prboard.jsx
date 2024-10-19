import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../styles/pr-irboard.css';

const Prboard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="choose" data-aos="fade-up">
      <div className="options">
        <div className="pr" data-aos="fade-right">
          Placement Representative
        </div>
        <div className="ir" data-aos="fade-left">
          Internship Representative
        </div>
      </div>
    </div>
  );
};

export default Prboard;
