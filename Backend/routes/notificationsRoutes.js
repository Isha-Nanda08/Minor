// notification routes

const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const { 
  createNotification, 
  getAllNotifications,
  getPrNotifications,
  updateNotificationStatus
} = require('../controllers/notificationsController');

// Public route to get all posted notifications (for students)
router.get('/', getAllNotifications);

// PR routes - protected
router.post('/', protect, restrictTo('PR'), createNotification);
router.get('/my-notifications', protect, restrictTo('PR'), getPrNotifications);
router.patch('/:id', protect, restrictTo('PR'), updateNotificationStatus);

module.exports = router;