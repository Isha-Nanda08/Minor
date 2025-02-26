const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/studentModel'); // Adjust path as needed

const router = express.Router();

// Login API
router.post('/login', async (req, res) => {
    const { institute_id, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ institute_id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, institute_id: user.institute_id },
            'your_secret_key', // Replace with a strong secret key
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
