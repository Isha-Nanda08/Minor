const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const { initGeminiAI } = require('./resumeService');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Initialize Gemini AI
if (process.env.GEMINI_API_KEY) {
  try {
    app.locals.gemini = initGeminiAI(process.env.GEMINI_API_KEY);
    console.log('Gemini AI service initialized');
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
  }
} else {
  console.warn('Warning: GEMINI_API_KEY not found in environment variables');
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Debug middleware - add this to see what requests are coming in
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API routes must come BEFORE the static file middleware
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/studentRoutes'));
app.use('/api/notifications', require('./routes/notificationsRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/queries', require('./routes/queryRoutes'));

// Default API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  // This must come AFTER all API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    error: 'Server Error', 
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;