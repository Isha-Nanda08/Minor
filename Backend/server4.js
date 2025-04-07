const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = 5000;
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure API key is set

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Helper function to interact with Gemini AI
async function generateAIResponse(prompt) {
  try {
    // const model = gemini.getGenerativeModel({ model: "gemini-1.0-pro" }); // Ensure the correct model
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text); // Ensure valid JSON response
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return { error: "Invalid JSON response from AI" };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "Failed to process AI request" };
  }
}

// Function to extract details from the resume
async function extractResumeDetails(text) {
  const prompt = `
  Extract the following details from this resume:
  - Full Name
  - Email
  - Phone Number
  - Skills
  - Work Experience (Company, Role, Duration)
  - Education (Degree, University, Year)
  - Certifications (if any)

  Return the response in JSON format.
  
  Resume Text:
  ${text}
  `;
  return generateAIResponse(prompt);
}

// Function to generate resume improvement suggestions
async function generateResumeSuggestions(text) {
  const prompt = `
  Analyze this resume and provide constructive feedback on how to improve it.
  Focus on:
  - Missing key skills relevant to the industry
  - Formatting and structure improvements
  - Enhancing work experience descriptions (achievements, quantification)
  - Additional certifications or skills that would be beneficial

  Provide a structured JSON output:
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
  return generateAIResponse(prompt);
}

// Function to calculate ATS (Applicant Tracking System) score
async function calculateATSScore(text) {
  const prompt = `
  Evaluate this resume and provide an ATS (Applicant Tracking System) score out of 100.
  
  Scoring Criteria:
  - Keyword match with common industry skills
  - Presence of clear sections (Experience, Skills, Education, Contact Info)
  - Readability and ATS-friendly formatting (no tables, columns, fancy fonts)
  - Quantified achievements in work experience
  - No missing key information (email, phone number, job titles)

  Return the response in JSON format:
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
  return generateAIResponse(prompt);
}

// Route to handle resume parsing
app.post("/parse-resume", upload.single("file"), async (req, res) => {
  console.log("Received file upload request!");

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfText = await pdfParse(req.file.buffer);
    const textContent = pdfText.text;

    console.log("Extracted text from resume:", textContent.slice(0, 500)); // Log only first 500 chars for debugging

    const extractedData = await extractResumeDetails(textContent);
    const suggestions = await generateResumeSuggestions(textContent);
    const atsScore = await calculateATSScore(textContent);

    res.json({
      parsed_resume: extractedData,
      resume_suggestions: suggestions,
      ats_score: atsScore
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Error processing the resume" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
