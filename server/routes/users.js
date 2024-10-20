const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import the User model
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         receiveEmails:
 *           type: boolean
 *           description: Whether the user receives emails or not
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
  const { userName, email, password, receiveEmails } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user
    const user = new User({ userName, email, password, receiveEmails });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Get the logged-in user's details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      username: user.username,
      email: user.email,
      profileImage: user.profileImage // Assuming you store a profile image URL
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
