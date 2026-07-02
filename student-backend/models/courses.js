const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  instructor: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);