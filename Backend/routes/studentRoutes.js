// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
// const auth = require('../middleware/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get user profile (protected route)
router.get('/login', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/login', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    
    // Update user
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Make sure user owns profile
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;