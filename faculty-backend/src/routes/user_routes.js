const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const auth = require('../middleware/auth');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // optional

// Protected routes
router.get('/profile', auth, userController.profile);

module.exports = router;
