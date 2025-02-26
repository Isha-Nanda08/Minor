const bcrypt = require('bcrypt'); // Optional if you want to hash passwords
const { users } = require('../config/data'); // Import static users data
const { generateToken } = require('../config/auth'); // JWT utility

// Registration Controller (this will store data in static memory)
const registerStudent = (req, res) => {
  const { name, instituteId, password, cg, backlogs, passingYear, degree } = req.body;

  // Check if the student already exists by instituteId
  const existingUser = users.find(user => user.instituteId === instituteId);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this Institute ID' });
  }

  // Add the new user to static data
  const newUser = {
    name,
    instituteId,
    password, // In a real scenario, password should be hashed using bcrypt
    cg,
    backlogs,
    passingYear,
    degree,
  };

  users.push(newUser); // Simulating adding a new student to the "database"
  res.status(201).json({ message: 'Student registered successfully' });
};

// Login Controller (uses static data for authentication)
const loginStudent = (req, res) => {
  const { instituteId, password } = req.body;

  // Check if the student exists in static data
  const student = users.find(user => user.instituteId === instituteId);
  if (!student) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare the password (In real-life scenarios, use bcrypt to compare hashed passwords)
  if (student.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token (using the static user data)
  const token = generateToken(student.instituteId);
  res.status(200).json({ message: 'Login successful', token });
};

module.exports = { registerStudent, loginStudent };
