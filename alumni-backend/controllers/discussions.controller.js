const Discussion = require("../models/Discussion");

// GET /api/discussions/all
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json({ success: true, discussions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/discussions/:id
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ success: false, message: "Discussion not found" });
    res.json({ success: true, discussion });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/discussions
exports.createDiscussion = async (req, res) => {
  try {
    const { title, details, tags, author } = req.body;
    if (!title || !details || !author) {
      return res.status(400).json({ success: false, message: "title, details and author are required" });
    }
    const discussion = await Discussion.create({ title, details, tags, author });
    res.status(201).json({ success: true, discussion });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/discussions/:id/reply
exports.addReply = async (req, res) => {
  try {
    const { author, content } = req.body;
    if (!author || !content) {
      return res.status(400).json({ success: false, message: "author and content are required" });
    }
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ success: false, message: "Discussion not found" });
    discussion.replies.push({ author, content });
    await discussion.save();
    res.status(201).json({ success: true, discussion });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
