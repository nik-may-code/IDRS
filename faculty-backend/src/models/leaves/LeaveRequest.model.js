const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
  // We link this request to the faculty's email directly.
  faculty_id: { type: String, required: true },
  leaveType: { type: String, required: true },
  reason: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  applicationFormUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);