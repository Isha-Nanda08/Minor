import React, { useState } from 'react';
import Header from '../components/Header';
import ATSboard from '../components/ATSboard';
import ResumeOptimization from '../components/ResumeOptimization';
import ATSscore from '../components/ATSscore';
import ATSScoreResults from '../components/AtsResults';
import ResumeScoreDashboard from '../components/ATS';
import Footer from '../components/Footer';

const ATSPage = () => {
  const [resumeResults, setResumeResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to handle file upload and API call
  const handleFileUpload = async (file) => {
   
      try {
        setIsLoading(true);
        setError(null);
        setShowResults(true);
        setResumeResults(null);
        
        console.log('Uploading file:', file.name, file.type);
        
        const formData = new FormData();
        formData.append('file', file);
        
        // Call your API endpoint
        const apiUrl = `/api/resume/parse`; // Use relative URL
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Server error: ${response.status}`);
        }
        
        // Only try to parse as JSON if the response is OK
        const data = await response.json();
        
        console.log('Resume parsed successfully', data);
        setResumeResults(data);
      } catch (error) {
        console.error('Error processing file:', error);
        setError(error.message || 'Failed to process resume');
      } finally {
        setIsLoading(false);
      }
    };
      
      // Get response as text first to inspect what's coming back
    //   const responseText = await response.text();
    //   console.log('Raw response preview:', responseText.substring(0, 200));
      
    //   let data;
    //   try {
    //     // Try to parse as JSON
    //     data = JSON.parse(responseText);
    //   } catch (parseError) {
    //     console.error('Failed to parse response as JSON:', parseError);
    //     if (responseText.includes('<!DOCTYPE html>')) {
    //       console.error('Server returned HTML instead of JSON');
    //       throw new Error('Server error: API returned HTML instead of JSON. Check server logs.');
    //     } else {
    //       throw new Error('Invalid response format from server');
    //     }
    //   }
      
    //   if (!response.ok) {
    //     throw new Error(data.error || `Server error: ${response.status}`);
    //   }
      
    //   console.log('Resume parsed successfully');
    //   setResumeResults(data);
    // } catch (error) {
    //   console.error('Error processing file:', error);
    //   setError(error.message || 'Failed to process resume');
    // } finally {
    //   setIsLoading(false);
    // }
  // };
  
  // Function to handle demo results (for testing UI without file upload)
  const showDemoResults = () => {
    setShowResults(true);
    setResumeResults(null); // This will trigger the demo data in the ATSScoreResults component
    setError(null);
    setIsLoading(false);
  };
  
  // Function to reset the page to initial state
  const handleReset = () => {
    setShowResults(false);
    setResumeResults(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="ats-page">
      {!showResults ? (
        <>
          <ATSboard onUpload={handleFileUpload} onDemoClick={showDemoResults} />
          <ResumeScoreDashboard/>
          <ResumeOptimization />
          <ATSscore onCheckClick={showDemoResults} />
        </>
      ) : (
        <div>
          {isLoading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Analyzing your resume with AI...</p>
              <p className="text-sm text-gray-500">This may take up to 30 seconds</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={handleReset}
              >
                Try Again
              </button>
            </div>
          )}
          
          {!isLoading && !error && (
            <>
              <div className="results-actions">
                <button 
                  className="back-button"
                  onClick={handleReset}
                >
                  ← Back to Upload
                </button>
              </div>
              <ATSScoreResults results={resumeResults} />
            </>
          )}
        </div>
      )}
      {/* <ATSScoreResults/> */}

      {/* <Footer /> */}
    </div>
  );
};

export default ATSPage;