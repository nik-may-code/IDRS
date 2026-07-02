const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  documentType: String,
  documentName: String,
  type: String,
  volume: String,
  issue: String,         // ✅ add this
  pages: String,         // ✅ add this
  publication: String,
  date: {
    type: Date,
    required: true
  },
  remarks: String,
  visibility: String,
  filePath: String,
  originalName: String,
  faculty_id: { type: String, required: true, ref: 'faculty_users' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', DocumentSchema);
