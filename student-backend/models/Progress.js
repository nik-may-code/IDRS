const mongoose = require('mongoose');
const ProgressSchema = new mongoose.Schema({ course: String, percent: Number });
module.exports = mongoose.model('Progress', ProgressSchema);
