require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());

// Path to the JSON file where student data will be stored
const studentsFilePath = path.join(__dirname, 'StudentData.json');

// Ensure the file exists, create it if it doesn't
if (!fs.existsSync(studentsFilePath)) {
  fs.writeFileSync(studentsFilePath, JSON.stringify([], null, 2));
}

// Multer configuration for storing uploaded resumes
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, and .docx files are allowed!"));
    }
  },
});

// Helper function to read student data from the JSON file
function readStudentData() {
  const data = fs.readFileSync(studentsFilePath, 'utf-8');
  return JSON.parse(data);
}

// Helper function to write student data to the JSON file
function writeStudentData(students) {
  fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
}

// Route for student registration
app.post("/api/students/register", upload.single("resume"), (req, res) => {
  try {
    const { name, branch, instituteId, cg, backlogs, passingYear, degree } = req.body;

    // Validate required fields
    if (!name || !branch || !instituteId || !cg || !backlogs || !passingYear || !degree) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Create a new student object
    const newStudent = {
      id: Date.now(), // Unique ID for the student
      name,
      branch,
      instituteId,
      cg: parseFloat(cg),
      backlogs: parseInt(backlogs, 10),
      passingYear: parseInt(passingYear, 10),
      degree,
      resumePath: req.file.path,
    };

    // Read existing student data
    const students = readStudentData();

    // Add the new student to the array
    students.push(newStudent);

    // Write updated student data back to the file
    writeStudentData(students);

    res.status(201).json({ message: "Student registered successfully!", student: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all registered students
app.get("/api/students", (req, res) => {
  try {
    const students = readStudentData();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Error reading student data file." });
  }
});

// Route to serve uploaded resumes
app.get("/api/resumes/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "File not found." });
  }
});

const companyFilePath = path.join(__dirname, 'CompanyData.json');

// Ensure the file exists, create it if it doesn't
if (!fs.existsSync(companyFilePath)) {
  fs.writeFileSync(companyFilePath, JSON.stringify([], null, 2)); // Initialize with an empty array
}

// Helper functions for reading and writing company data
function readCompanyData() {
  const data = fs.readFileSync(companyFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeCompanyData(companies) {
  fs.writeFileSync(companyFilePath, JSON.stringify(companies, null, 2));
}

// Route for adding company details
app.post("/api/companies/add", (req, res) => {
  try {
    const {
      companyName, // Name of the company
      role,        // Job role
      minCGPA,     // Minimum CGPA required
      eligibleBranches, // Comma-separated branches
      maxBacklogs, // Maximum allowed backlogs
      degree,      // Eligible degree (B.Tech, M.Tech, etc.)
      package,     // Package offered (LPA)
      stipend,     // Internship stipend (if applicable)
      visitingYear // Year the company is visiting
    } = req.body;

    // Validate required fields
    if (!companyName || !role || !minCGPA || !eligibleBranches || maxBacklogs === undefined || !degree || !visitingYear) {
      return res.status(400).json({ message: "All fields are required except package and stipend." });
    }

    // Create new company object
    const newCompany = {
      id: Date.now(), // Unique ID for each company
      companyName,
      role,
      minCGPA: parseFloat(minCGPA),
      eligibleBranches: eligibleBranches.split(',').map(branch => branch.trim()), // Convert to array
      maxBacklogs: parseInt(maxBacklogs, 10),
      degree,
      package: parseFloat(package) || null, // Nullable fields
      stipend: parseFloat(stipend) || null,
      visitingYear: parseInt(visitingYear, 10),
    };

    // Read and update company data
    const companies = readCompanyData();
    companies.push(newCompany);
    writeCompanyData(companies);

    res.status(201).json({ message: "Company added successfully!", company: newCompany });
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all company details
app.get("/api/companies", (req, res) => {
  try {
    const companies = readCompanyData();
    res.status(200).json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ message: "Error reading company data file." });
  }
});

// Default home route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Registration Backend!");
});

// Route to check student eligibility for companies
app.get("/api/students/eligibility/:studentId", (req, res) => {
  try {
    const studentId = req.params.studentId;
    const students = readStudentData();
    const companies = readCompanyData();
    
    // Find the student by ID
    const student = students.find(s => s.id === parseInt(studentId));
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Check eligibility for each company
    const eligibility = companies.map((company) => {
      const isEligible =
        student.cg >= company.minCGPA &&
        student.backlogs <= company.maxBacklogs &&
        company.eligibleBranches.includes(student.branch) &&
        student.degree === company.degree;
      return {
        companyName: company.companyName,
        role: company.role,
        eligible: isEligible ? "Eligible" : "Not Eligible",
      };
    });

    res.status(200).json(eligibility);
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start the server
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
