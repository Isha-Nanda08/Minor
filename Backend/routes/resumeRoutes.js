const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/studentModel"); // Import User model
const { route } = require("./studentRoutes");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to extract ALL student details from the resume
async function extractStudentDetails(text) {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
    Extract ALL student details from this resume and return in structured JSON format.

    Resume Text:
    ${text}
    `;

    const result = await model.generateContent(prompt);
    
    // ✅ Ensure response exists
    if (!result || !result.response || !result.response.text) {
        throw new Error("AI returned an empty response");
    }

    const rawText = result.response.text().trim();
    
    // ✅ Ensure response is not empty
    if (!rawText) {
        throw new Error("AI response is empty");
    }

    // ✅ Handle cases where AI may wrap response in code blocks
    const cleanedText = rawText.replace(/```json|```/g, "").trim();
    
    try {
        return JSON.parse(cleanedText); // ✅ Handle invalid JSON
    } catch (error) {
        console.error("AI Response:", rawText); // Debugging output
        throw new Error("Failed to parse AI response as JSON");
    }
}


// Function to calculate ATS score
async function calculateATSScore(text) {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
    Evaluate this resume and provide an ATS (Applicant Tracking System) score out of 100.
    Provide the response in JSON format.

    Resume Text:
    ${text}
    `;

    const result = await model.generateContent(prompt);

    // ✅ Ensure response exists
    if (!result || !result.response || !result.response.text) {
        throw new Error("AI returned an empty response");
    }

    const rawText = result.response.text().trim();

    // ✅ Ensure response is not empty
    if (!rawText) {
        throw new Error("AI response is empty");
    }

    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Response:", rawText); // Debugging output
        throw new Error("Failed to parse AI response as JSON");
    }
}
// Function to generate resume improvement suggestions
async function generateResumeSuggestions(text) {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
    Analyze this resume and suggest **specific improvements** to make it more ATS-friendly and appealing to recruiters.
    Provide suggestions in JSON format:
    {
      "suggestions": [
        "Improve the formatting of the education section",
        "Add more technical skills relevant to the job role",
        "Include quantifiable achievements in the experience section"
      ]
    }

    Resume Text:
    ${text}
    `;

    const result = await model.generateContent(prompt);

    // ✅ Ensure response exists
    if (!result || !result.response || !result.response.text) {
        throw new Error("AI returned an empty response");
    }

    const rawText = result.response.text().trim();

    // ✅ Handle cases where AI wraps response in code blocks
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Response:", rawText);
        throw new Error("Failed to parse AI response as JSON");
    }
}

// Route to parse resume and store student details
router.post("/parse-resume", upload.single("file"), async (req, res) => {
    console.log("Received file upload request!");

    if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const pdfText = await pdfParse(req.file.buffer);
        console.log("Extracted text from PDF:", pdfText.text.slice(0, 500));

        // ✅ Correct function name
        const extractedData = await extractStudentDetails(pdfText.text);
        // console.log("Extracted Resume Details:", extractedData);

        const suggestions = await generateResumeSuggestions(pdfText.text);
        // console.log("Resume Suggestions:", suggestions);

        const atsScore = await calculateATSScore(pdfText.text);
        // console.log("ATS Score:", atsScore);

        res.json({
            parsed_resume: extractedData,
            resume_suggestions: suggestions,
            ats_score: atsScore
        });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Error processing the resume", details: error.message });
    }
});

  

module.exports = router;
