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
// In your queryRoutes.js file
router.put('/:id/respond',protect, restrictTo('PR') , async (req, res) => {
  try {
    const { answer, answerText, status } = req.body;
    
    const query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }
    
    // Create the answer object with the proper structure
    query.answer = {
      // Use answerText if provided, otherwise if answer is a string use that,
      // otherwise try to extract text from answer object
      text: answerText || (typeof answer === 'string' ? answer : (answer && typeof answer.text === 'string' ? answer.text : '')),
      answeredBy: req.user.id,
      answeredAt: new Date()
    };
    
    query.status = status || 'answered';
    
    await query.save();
    
    return res.json({ success: true, query });
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});



// Mark query as viewed by the student (without deleting)
router.put('/mark-viewed/:queryId', protect, restrictTo('student'), async (req, res) => {
  try {
    const { queryId } = req.params;
    
    // Find the query
    const query = await Query.findById(queryId);
    
    if (!query) {
      return res.status(404).json({ 
        success: false,
        message: 'Query not found' 
      });
    }
    
    // Verify that this query belongs to the requesting student
    if (query.student.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. You can only view your own queries.' 
      });
    }

    // Mark as viewed
    query.viewed = true;
    await query.save();

    return res.json({ 
      success: true, 
      message: 'Query marked as viewed' 
    });
  } catch (error) {
    console.error('Error marking query as viewed:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Add a new endpoint for students to acknowledge and delete a query
router.delete('/acknowledge/:queryId', protect, restrictTo('student'), async (req, res) => {
  try {
    const { queryId } = req.params;
    
    // Find the query
    const query = await Query.findById(queryId);
    
    if (!query) {
      return res.status(404).json({ 
        success: false,
        message: 'Query not found' 
      });
    }
    
    // Verify that this query belongs to the requesting student
    if (query.student.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. You can only delete your own queries.' 
      });
    }

    // Delete the query from database
    await Query.findByIdAndDelete(queryId);

    return res.json({ 
      success: true, 
      message: 'Query acknowledged and removed successfully' 
    });
  } catch (error) {
    console.error('Error deleting query:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Add an endpoint for students to fetch their own queries
router.get('/my-queries', protect, restrictTo('student'), async (req, res) => {
  try {
    // Find all queries for this student
    const queries = await Query.find({ student: req.user.id })
      .sort({ updatedAt: -1 });
    
    return res.json({ 
      success: true, 
      queries 
    });
  } catch (error) {
    console.error('Error fetching student queries:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router;