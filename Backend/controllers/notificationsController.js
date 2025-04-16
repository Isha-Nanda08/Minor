// notification controller

const Notification = require('../models/notifications');
const User = require('../models/User');
// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { content, branch } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Notification content is required' });
    }
    
    const user = await User.findById(req.user.id);
    
    const newNotification = new Notification({
      content,
      postedBy: req.user.id,
      name: user.name,
      branch: branch || user.branch,
      status: 'posted'
    });
    const savedNotification = await newNotification.save();
    res.status(201).json({
      success: true,
      data: savedNotification,
      message: 'Notification posted successfully'
    });
  } catch (error) {
    console.error('Error posting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while posting notification'
    });
  }
};
// Get all posted notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ status: 'posted' })
      .sort({ createdAt: -1 })
      .select('content createdAt'); // Only send content and date to students
    
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
};
// Get PR's own notifications
exports.getPrNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      postedBy: req.user.id,
      status: { $in: ['posted', 'draft'] }
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching PR notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching PR notifications'
    });
  }
};

// Update notification status
exports.updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['posted', 'draft', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const notification = await Notification.findById(id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }
    
    // Ensure the PR can only update their own notifications
    if (notification.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this notification'
      });
    }
    
    notification.status = status;
    await notification.save();
    
    res.status(200).json({
      success: true,
      data: notification,
      message: `Notification ${status} successfully`
    });
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating notification'
    });
  }
};