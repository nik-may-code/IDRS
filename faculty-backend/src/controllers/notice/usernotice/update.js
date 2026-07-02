// controllers/notice/usernotice/update.js (Corrected)

const Notice = require('../../../models/notice');
// You need the file deletion utility
const { deleteFromFirebase } = require('../../../middleware/firebaseUpload');

// --- UPDATE a notice, ensuring ownership and handling attachments ---
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id;

    // 1. Find the original notice
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    // 2. Security check: Enforce ownership
    if (notice.userid.toString() !== loggedInUserId) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to update this notice." });
    }

    // 3. Prepare the update data safely
    const { title, content } = req.body;
    const updateData = { title, content };

    // You can add logic for recipients if needed
    if (req.body.recipients) {
        try {
            updateData.recipients = JSON.parse(req.body.recipients);
        } catch (e) {
            updateData.recipients = req.body.recipients;
        }
    }

    // 4. Check if a NEW file was uploaded
    if (req.file && req.file.firebaseUrl) {
      // 5. If an OLD file exists, delete it from Firebase
      if (notice.attachment) {
        await deleteFromFirebase(notice.attachment);
      }
      // 6. Set the NEW file's URL to be saved in the database
      updateData.attachment = req.file.firebaseUrl;
    }

    // 7. Perform the safe update in the database
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { $set: updateData }, // Use $set to only update provided fields
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedNotice);
    
  } catch (err) {
    console.error("Error updating notice:", err);
    res.status(500).json({ message: "Failed to update notice. " + err.message });
  }
};