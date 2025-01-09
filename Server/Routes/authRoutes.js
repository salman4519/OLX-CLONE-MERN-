const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign Up Route
router.post('/signup', authController.signup);

// Log In Route
router.post('/login', authController.login);

module.exports = router;
