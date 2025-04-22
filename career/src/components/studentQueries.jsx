// src/components/StudentQueries.js
import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  Snackbar, 
  Alert, 
  Box, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DoneIcon from '@mui/icons-material/Done';
import RefreshIcon from '@mui/icons-material/Refresh';
import api from '../Api';
import '../styles/StudentQueries.css';

const StudentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);

  useEffect(() => {
    fetchQueries();
    
    // Set up auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      fetchQueries(false); // Silent refresh (don't show loading indicator)
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const fetchQueries = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.get('/api/queries/my-queries', config);
      
      if (response.data && response.data.queries) {
        setQueries(response.data.queries);
        
        // Mark unviewed answered queries as viewed
        response.data.queries.forEach(query => {
          if (query.status === 'answered' && query.answer.text && !query.viewed) {
            markQueryAsViewed(query._id);
          }
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
      
      // Set the appropriate error message
      if (error.response) {
        // Server responded with an error status
        setError(`Server error: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request made but no response received
        setError('No response from server. Please check your connection and try again.');
      } else {
        // Error with request setup
        setError(`Error: ${error.message}`);
      }
      
      if (showLoading) {
        showSnackbar('Failed to load your queries. ' + (error.message || ''), 'error');
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };
  
  // Mark a query as viewed (but don't delete it yet)
  const markQueryAsViewed = async (queryId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      await api.put(`/api/queries/mark-viewed/${queryId}`, {}, config);
      
      // Update local state to reflect the query being viewed
      setQueries(prevQueries => 
        prevQueries.map(query => 
          query._id === queryId 
            ? { ...query, viewed: true } 
            : query
        )
      );
    } catch (error) {
      console.error('Error marking query as viewed:', error);
    }
  };

  // Open confirmation dialog before deletion
  const openDeleteConfirmation = (queryId) => {
    setQueryToDelete(queryId);
    setConfirmDialogOpen(true);
  };

  // Handle the actual delete after confirmation
  const handleAcknowledgeQuery = async () => {
    try {
      setConfirmDialogOpen(false);
      if (!queryToDelete) return;
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.delete(`/api/queries/acknowledge/${queryToDelete}`, config);
      
      if (response.data && response.data.success) {
        // Remove the query from the local state
        setQueries(prevQueries => prevQueries.filter(query => query._id !== queryToDelete));
        showSnackbar('Response acknowledged and removed successfully!', 'success');
      } else {
        throw new Error('Server responded without success status');
      }
    } catch (error) {
      console.error('Error acknowledging query:', error);
      
      let errorMessage = 'Failed to acknowledge query. ';
      if (error.response && error.response.data) {
        errorMessage += error.response.data.message || '';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      showSnackbar(errorMessage, 'error');
    } finally {
      setQueryToDelete(null);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRetry = () => {
    fetchQueries();
  };

  if (loading) {
    return (
      <div className="loading-container small">
        <div className="loading-spinner"></div>
        <p>Loading your queries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-queries-container">
        <Paper elevation={3} className="queries-paper error-container">
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading Queries
          </Typography>
          <Typography variant="body1" paragraph>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRetry}
          >
            Retry
          </Button>
        </Paper>
      </div>
    );
  }

  // Group queries by status
  const pendingQueries = queries.filter(q => q.status === 'pending');
  const answeredQueries = queries.filter(q => q.status === 'answered');

  return (
    <div className="student-queries-container">
      <Paper elevation={3} className="queries-paper">
        <div className="queries-header">
          <QuestionAnswerIcon className="queries-icon" />
          <Typography variant="h5" component="h2">
            Your Queries & Responses
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<RefreshIcon />} 
              onClick={handleRetry}
            >
              Refresh
            </Button>
          </Box>
        </div>

        {queries.length === 0 ? (
          <div className="empty-queries">
            <HelpOutlineIcon className="empty-icon" />
            <Typography variant="body1">
              You haven't submitted any queries yet.
            </Typography>
          </div>
        ) : (
          <div className="queries-list">
            {answeredQueries.length > 0 && (
              <div className="query-section">
                <Typography variant="h6" className="section-title" color="primary">
                  Answered Queries
                </Typography>
                
                {answeredQueries.map((query) => (
                  <div key={query._id} className={`query-item answered`}>
                    <div className="query-content">
                      <div className="query-meta">
                        <Typography variant="caption" color="textSecondary">
                          Submitted on {formatDate(query.createdAt)}
                        </Typography>
                        <span className="status-badge answered">
                          Answered
                        </span>
                      </div>
                      
                    {/* <Typography variant="body1" className="response-text">
                        <strong>PR Response:</strong> {query.answer.text}
                    </Typography> */}
                      
                      {query.answer && (
                        <>
                          <Divider className="response-divider" />
                          <div className="query-response">
                            <Typography variant="body1" className="response-text">
                              <strong>PR Response:</strong> {query.answer.text}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Answered on {formatDate(query.answer.answeredAt)}
                            </Typography>
                            
                            <Button



                              variant="contained"
                              color="primary"
                              startIcon={<DoneIcon />}
                              className="acknowledge-button"
                              onClick={() => openDeleteConfirmation(query._id)}
                            >
                              Acknowledge & Remove
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {pendingQueries.length > 0 && (
              <div className="query-section">
                <Typography variant="h6" className="section-title" color="secondary">
                  Pending Queries
                </Typography>
                
                {pendingQueries.map((query) => (
                  <div key={query._id} className="query-item pending">
                    <div className="query-content">
                      <div className="query-meta">
                        <Typography variant="caption" color="textSecondary">
                          Submitted on {formatDate(query.createdAt)}
                        </Typography>
                        <span className="status-badge pending">
                          Pending
                        </span>
                      </div>
                      
                      <Typography variant="body1" className="query-text">
                        <strong>Your Query:</strong> {query.text}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Paper>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove this query?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After acknowledgment, this query and its response will be permanently removed from your history. 
            Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAcknowledgeQuery} color="primary" autoFocus>
            Yes, Remove It
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentQueries;