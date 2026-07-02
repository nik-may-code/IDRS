const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  details: { type: String, required: true },
  tags: { type: String, default: "" },
  author: { type: String, required: true },
  replies: { type: [ReplySchema], default: [] },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Discussion", DiscussionSchema);
