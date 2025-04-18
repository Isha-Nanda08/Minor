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
  app.locals.gemini = initGeminiAI(process.env.GEMINI_API_KEY);
  console.log('Gemini AI service initialized');
} else {
  console.warn('Warning: GEMINI_API_KEY not found in environment variables');
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/studentRoutes'));
app.use('/api/notifications', require('./routes/notificationsRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes')); // Add the new resume routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Default route
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For testing purposes