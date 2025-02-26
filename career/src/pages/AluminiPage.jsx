import React from 'react';

const alumniData = [
  {
    company: 'Google',
    alumni: [
      { name: 'Ravi Kumar', batch: '2015', role: 'Software Engineer' },
      { name: 'Amit Sharma', batch: '2016', role: 'Data Scientist' },
    ],
  },
  {
    company: 'Microsoft',
    alumni: [
      { name: 'Neha Patel', batch: '2014', role: 'Cloud Architect' },
      { name: 'Sandeep Verma', batch: '2017', role: 'UX Designer' },
    ],
  },
  {
    company: 'Amazon',
    alumni: [
      { name: 'Ankur Soni', batch: '2018', role: 'Product Manager' },
      { name: 'Meera Yadav', batch: '2019', role: 'Operations Head' },
    ],
  },
  // Add more companies and alumni as needed
];

const AlumniPage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '30px' }}>Alumni of NIT Jalandhar</h1>

      {alumniData.map((companyData, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: '2rem',
              color: '#34495e',
              borderBottom: '2px solid #3498db',
              paddingBottom: '10px',
              marginBottom: '20px',
            }}
          >
            {companyData.company}
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            {companyData.alumni.map((alumnus, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ecf0f1',
                  padding: '20px',
                  margin: '10px',
                  borderRadius: '8px',
                  width: '250px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  textAlign: 'left',
                }}
              >
                <h3 style={{ color: '#2980b9', marginBottom: '5px' }}>{alumnus.name}</h3>
                <p style={{ color: '#7f8c8d', margin: '5px 0' }}>Batch: {alumnus.batch}</p>
                <p style={{ color: '#7f8c8d', margin: '5px 0' }}>Role: {alumnus.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlumniPage;
