// middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    console.log('Auth header received:', authHeader ? 'Yes' : 'No');
    
    if (!authHeader) {
      console.log('Authentication failed: No auth header');
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }
    
    // Extract token from Bearer format
    const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;
    
    console.log('Attempting to verify token');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    console.log('Token verified successfully for user ID:', decoded.id);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    console.error('Error details:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};