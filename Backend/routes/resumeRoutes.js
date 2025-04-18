const express = require('express');
const router = express.Router();
const { upload, parseResume } = require('../resumeService');

// Access the Gemini instance from the app locals
router.post('/parse', upload.single('file'), (req, res) => {
  const gemini = req.app.locals.gemini;
  if (!gemini) {
    return res.status(500).json({ error: "Gemini AI service not initialized" });
  }
  
  return parseResume(req, res, gemini);
});

module.exports = router;