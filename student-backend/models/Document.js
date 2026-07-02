const mongoose = require("mongoose");

// Document schema & model
const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  category: String,
  uploadedBy: String,
  date: { type: Date, default: Date.now },
  documentUrl: { type: String, required: true },
  filePath: { type: String, required: true } // <-- Added
});

module.exports = mongoose.model("Document", documentSchema);