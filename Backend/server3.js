const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = 5000;
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use Gemini API key

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

async function extractResumeDetails(text) {
  const model = gemini.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Extract the following details from this resume:
  - Full Name
  - Email
  - Phone Number
  - Skills
  - Work Experience (Company, Role, Duration)
  - Education (Degree, University, Year)
  - Certifications (if any)

  Format the output as a structured JSON.

  Resume Text:
  ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function generateResumeSuggestions(text) {
  const model = gemini.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Analyze this resume and provide constructive feedback on how to improve it.
  Focus on:
  - Missing key skills relevant to the industry
  - Formatting and structure improvements
  - Improvements in work experience descriptions (achievements, quantification)
  - Additional certifications or skills that would be beneficial
  - Any general areas that can make the resume stronger

  Provide your response in a structured JSON format with categories like:
  {
    "Skill Improvements": "...",
    "Work Experience Enhancements": "...",
    "Formatting Suggestions": "...",
    "Certifications to Consider": "...",
    "General Feedback": "..."
  }

  Resume Text:
  ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function calculateATSScore(text) {
  const model = gemini.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Evaluate this resume and provide an ATS (Applicant Tracking System) score out of 100.
  
  Scoring Criteria:
  - Keyword match with common industry skills
  - Presence of clear sections (Experience, Skills, Education, Contact Info)
  - Readability and ATS-friendly formatting (no tables, columns, fancy fonts)
  - Quantified achievements in work experience
  - No missing key information (email, phone number, job titles)

  Provide the response in JSON format:
  {
    "ATS Score": "XX",
    "Keyword Match": "XX%",
    "Formatting Issues": "XX%",
    "Work Experience Clarity": "XX%",
    "Missing Sections": "XX%",
    "Final Suggestions": "..."
  }

  Resume Text:
  ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

app.post("/parse-resume", upload.single("file"), async (req, res) => {
  console.log("Received request!");
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfText = await pdfParse(req.file.buffer);
    const extractedData = await extractResumeDetails(pdfText.text);
    const suggestions = await generateResumeSuggestions(pdfText.text);
    const atsScore = await calculateATSScore(pdfText.text);

    res.json({
      parsed_resume: extractedData,
      resume_suggestions: suggestions,
      ats_score: atsScore
    });
  } catch (error) {
    console.error("Error processing:", error);
    res.status(500).json({ error: "Error processing the resume" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

