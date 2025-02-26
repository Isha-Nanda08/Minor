const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/studentModel');
const { authenticateUser, JWT_SECRET, REFRESH_SECRET } = require('../middleware/authMiddleware');

const router = express.Router();

//  Generate Access & Refresh Tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id, institute_id: user.institute_id }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id, institute_id: user.institute_id }, REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

// router.post("/", (req, res) => {
//     res.json({ message: "✅ POST request to /auth received!" });
// });
//  Login Student & Issue Tokens
router.post('/login', [
    body('institute_id').isNumeric(),
    body('password').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { institute_id, password } = req.body;
        const user = await User.findOne({ institute_id });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();

        // Store refresh token in HTTP-Only Cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.json({ message: 'Login successful', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//  Refresh Token Route
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

        // Save new refresh token in DB
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set new refresh token in cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
});

// Logout (Clear Refresh Token)
router.post('/logout', async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(204);

    try {
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//  Protected Route Example
router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
