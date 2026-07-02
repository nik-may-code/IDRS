const mongoose = require('mongoose');

// Unified Document Schema accommodating Student, Faculty, and Alumni fields
const DocumentSchema = new mongoose.Schema({
  // Common Fields
  documentName: { type: String, alias: 'name' }, // alias to support Student frontend's "name"
  documentType: { type: String, alias: 'type' },
  filePath: String, // Firebase URL
  originalName: String,
  date: { type: Date, required: true },
  uploadedBy: String, // generic uploader identifier (used by Student/Alumni)
  
  // Faculty Specific Fields
  faculty_id: { type: String, ref: 'faculty_users' },
  volume: String,
  issue: String,
  pages: String,
  publication: String,
  remarks: String,
  visibility: String,
  
  // Student Specific Fields
  category: String,
  
}, {
  timestamps: true,
  strict: false // Allow other fields if needed
});

module.exports = DocumentSchema;
