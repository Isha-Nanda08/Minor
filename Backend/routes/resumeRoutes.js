const express = require('express');
const router = express.Router();
const { upload, parseResume } = require('../resumeService');

// Access the Gemini instance from the app locals
router.post('/parse', upload.single('file'), (req, res, next) => {
  console.log('Resume parse endpoint hit');
  
  try {
    const gemini = req.app.locals.gemini;
    if (!gemini) {
      console.error('Gemini AI not initialized');
      return res.status(500).json({ error: "Gemini AI service not initialized" });
    }
    
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    console.log(`Processing resume: ${req.file.originalname} (${req.file.size} bytes)`);
    
    return parseResume(req, res, gemini);
  } catch (error) {
    console.error('Error in resume route handler:', error);
    next(error); // Forward to error handler
  }
});
router.get('/test', (req, res) => {
  res.json({ message: "Resume API test successful" });
});

module.exports = router;