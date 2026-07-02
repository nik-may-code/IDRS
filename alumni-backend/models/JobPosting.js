const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: String },
  qualifications: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model("JobPosting", JobPostingSchema);
