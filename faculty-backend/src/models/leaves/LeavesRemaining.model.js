const mongoose = require('mongoose');

const LeavesRemainingSchema = new mongoose.Schema({
  faculty_id: {
    type: String,
    required: true,
    unique: true, // Make sure this is present!
  },
  leaveBalances: {
    sick: { type: Number, default: 20 },
    casual: { type: Number, default: 18 },
    earned: { type: Number, default: 12 },
    maternity: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model('LeaveBalance', LeavesRemainingSchema);
