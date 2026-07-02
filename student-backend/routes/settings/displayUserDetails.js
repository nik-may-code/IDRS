// routes/settings/getuserbyemail.js

const express = require('express');
const User = require('../../models/User'); // Adjust path if needed
const router = express.Router();

// GET a user by email (excluding password)
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }, '-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
