// controllers/profile/view.js

const User = require('../../models/user_model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: 'Failed to fetch profile. ' + err.message });
  }
};