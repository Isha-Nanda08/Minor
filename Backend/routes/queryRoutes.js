const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { protect, restrictTo } = require('../middleware/auth');

// Submit a new query
router.post('/submit', protect, restrictTo('student'), async (req, res) => {
  try {
    const { queryText } = req.body;
    
    // Get studentId from authenticated user
    const studentId = req.user.id;
    
    // Create new query
    const newQuery = new Query({
      text: queryText,
      student: studentId,
      status: 'pending',
      createdAt: new Date()
    });
    
    // Save query to database
    await newQuery.save();
    
    res.status(201).json({
      success: true,
      message: 'Query submitted successfully',
      query: newQuery
    });
  } catch (error) {
    console.error('Error submitting query:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting query'
    });
  }
});

// Get all queries for a student
// In your queryRoutes.js file

// Get all queries (for PR/admin)
router.get('/all', protect, restrictTo('PR'), async (req, res) => {
  try {
    // Find all queries, populate with student information
    const queries = await Query.find()
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, queries });
  } catch (error) {
    console.error('Error fetching all queries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching queries'
    });
  }
});

// Respond to a query
router.put('/:id/respond', protect, restrictTo('PR'), async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, status } = req.body;
    
    if (!answer) {
      return res.status(400).json({
        success: false,
        message: 'Response text is required'
      });
    }
    
    // Find and update the query
    const query = await Query.findById(id);
    
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }
    
    // Update the query
    query.answer = answer;
    query.status = status || 'answered';
    query.answeredAt = new Date();
    query.answeredBy = req.user.id;
    
    await query.save();
    
    res.json({
      success: true,
      message: 'Query responded successfully',
      query
    });
  } catch (error) {
    console.error('Error responding to query:', error);
    res.status(500).json({
      success: false,
      message: 'Error responding to query'
    });
  }
});

module.exports = router;