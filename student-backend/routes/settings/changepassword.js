const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User'); // Adjust path as needed
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Input validation
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({
      message: 'Missing required fields',
      details: 'Email, current password, and new password are required'
    });
  }

  try {
    // Normalize email by trimming and converting to lowercase
    const normalizedEmail = email.trim().toLowerCase();
    console.log('Searching for user with email:', normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found',
        details: 'No user found with the provided email address'
      });
    }

    // Log password comparison attempt
    console.log('Attempting password comparison for user:', user.email);
    const isMatch = await user.comparePassword(currentPassword);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Incorrect current password',
        details: 'The current password provided does not match the stored password'
      });
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    console.log('Password updated successfully for user:', user.email);

    res.status(200).json({ 
      message: 'Password updated successfully',
      details: 'Your password has been changed successfully'
    });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ 
      message: 'Internal server error',
      details: 'An error occurred while changing the password'
    });
  }
});

module.exports = router;
