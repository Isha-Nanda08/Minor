const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini AI
const initGeminiAI = (apiKey) => {
  return new GoogleGenerativeAI(apiKey);
};

// Improved helper function to interact with Gemini AI with better JSON handling
async function generateAIResponse(gemini, prompt) {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown formatting if present
    text = text.replace(/```json|```|`/g, '').trim();
    
    // Try to find JSON content if there's surrounding text
    const jsonMatch = text.match(/(\{[\s\S]*\})/);
    const jsonContent = jsonMatch ? jsonMatch[0] : text;
    
    try {
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      console.error("Raw text received:", text.substring(0, 200));
      return { error: "Invalid JSON response from AI", raw_text: text.substring(0, 500) };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "Failed to process AI request" };
  }
}

// Add retry logic to handle cases where model fails to provide valid JSON
async function getValidJsonResponse(gemini, promptFunction, text, maxRetries = 3) {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    const result = await promptFunction(gemini, text);
    if (!result.error) {
      return result;
    }
    
    attempts++;
    console.log(`Retry attempt ${attempts} for JSON parsing`);
  }
  
  // If all retries fail, return a structured error with fallback data
  return {
    error: "Failed to parse after multiple attempts",
    fallback_data: extractFallbackData(text)
  };
}

// Simple function to extract basic data even if AI fails
function extractFallbackData(text) {
  // Simple regex patterns to catch common data
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/);
  const nameMatch = text.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+)+)/m);
  
  return {
    email: emailMatch ? emailMatch[0] : "Not found",
    phone: phoneMatch ? phoneMatch[0] : "Not found",
    name: nameMatch ? nameMatch[0] : "Not found"
  };
}

// Function to extract details from the resume with clearer prompt
async function extractResumeDetails(gemini, text) {
  const prompt = `
  Extract the following details from this resume:
  - Full Name
  - Email
  - Phone Number
  - Skills
  - Work Experience (Company, Role, Duration)
  - Education (Degree, University, Year)
  - Certifications (if any)

  Format your response as a valid JSON object without any markdown formatting, code blocks, or backticks.
  DO NOT use \`\`\`json or any similar markdown formatting.
  Return ONLY the raw JSON object.
  
  Resume Text:
  ${text}
  `;
  return generateAIResponse(gemini, prompt);
}

// Function to generate resume improvement suggestions
async function generateResumeSuggestions(gemini, text) {
  const prompt = `
  Analyze this resume and provide constructive feedback on how to improve it.
  Focus on:
  - Missing key skills relevant to the industry
  - Formatting and structure improvements
  - Enhancing work experience descriptions (achievements, quantification)
  - Additional certifications or skills that would be beneficial

  Format your response as a valid JSON object without any markdown formatting, code blocks, or backticks.
  DO NOT use \`\`\`json or any similar markdown formatting.
  Return ONLY the raw JSON object with this exact structure:
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
  return generateAIResponse(gemini, prompt);
}

// Function to calculate ATS score
async function calculateATSScore(gemini, text) {
  const prompt = `
  Evaluate this resume and provide an ATS (Applicant Tracking System) score out of 100.
  
  Scoring Criteria:
  - Keyword match with common industry skills
  - Presence of clear sections (Experience, Skills, Education, Contact Info)
  - Readability and ATS-friendly formatting (no tables, columns, fancy fonts)
  - Quantified achievements in work experience
  - No missing key information (email, phone number, job titles)

  Format your response as a valid JSON object without any markdown formatting, code blocks, or backticks.
  DO NOT use \`\`\`json or any similar markdown formatting.
  Return ONLY the raw JSON object with this exact structure:
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
  return generateAIResponse(gemini, prompt);
}

// Handler function for resume parsing
async function parseResume(req, res, gemini) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfText = await pdfParse(req.file.buffer);
    const textContent = pdfText.text;

    console.log("Extracted text from resume:", textContent.slice(0, 500)); // Log only first 500 chars for debugging

    // Use our retry logic with the prompt functions
    const extractedData = await getValidJsonResponse(gemini, extractResumeDetails, textContent);
    const suggestions = await getValidJsonResponse(gemini, generateResumeSuggestions, textContent);
    const atsScore = await getValidJsonResponse(gemini, calculateATSScore, textContent);

    return res.json({
      parsed_resume: extractedData,
      resume_suggestions: suggestions,
      ats_score: atsScore
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    return res.status(500).json({ error: "Error processing the resume" });
  }
}

module.exports = {
  upload,
  initGeminiAI,
  parseResume
};