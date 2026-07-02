// models/notice.js

const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'faculty_users', 
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  recipients: [{ type: String, enum: ['Students', 'Faculty', 'HOD', 'All'], required: true }],
  attachment: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);