const User = require('../../models/user_model');
// Import the new deletion utility
const { deleteFromFirebase } = require('../../middleware/firebaseUpload');

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, dob } = req.body;
    const updateData = { name, email, mobile, dob };

    // If a NEW photo is being uploaded, we must delete the OLD one first.
    if (req.file && req.file.firebaseUrl) {
      // 1. Get the current user to find the old photo URL.
      const currentUser = await User.findById(req.user.id).select('photoUrl');

      // 2. If an old photo URL exists, delete it from Firebase.
      if (currentUser && currentUser.photoUrl) {
        await deleteFromFirebase(currentUser.photoUrl);
      }

      // 3. Add the new photo URL to the update data.
      updateData.photoUrl = req.file.firebaseUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(updatedUser);

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: 'Failed to update profile. ' + err.message });
  }
};