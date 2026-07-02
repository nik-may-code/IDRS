// controllers/notice/usernotice/delete.js
const Notice = require('../../../models/notice');
const { deleteFromFirebase } = require('../../../middleware/firebaseUpload');

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id;

    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    if (notice.userid.toString() !== loggedInUserId) {
      return res.status(403).json({ message: "Forbidden: You are not authorized to delete this notice." });
    }

    if (notice.attachment) {
      await deleteFromFirebase(notice.attachment);
    }

    await Notice.findByIdAndDelete(id);

    res.status(200).json({ message: "Notice deleted successfully." });

  } catch (err) {
    console.error("Error deleting notice:", err);
    res.status(500).json({ message: "Failed to delete notice." });
  }
};