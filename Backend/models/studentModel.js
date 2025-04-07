const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    skills: [String],
    education: [
        {
            degree: String,
            university: String,
            year: String
        }
    ],
    certifications: [String],
    cgpa: Number,
    branch: String,
    backlogs: Number,
    atsScore: Number,
    suggestions: [String]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
