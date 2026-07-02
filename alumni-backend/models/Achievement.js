const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // e.g. "Promoted to VP"
  description: { type: String, required: true },
  alumniName: { type: String, required: true }, // Name of the alumni
  dateAchieved: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Achievement", AchievementSchema);
