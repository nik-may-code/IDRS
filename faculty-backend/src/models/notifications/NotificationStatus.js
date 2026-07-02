const mongoose = require('mongoose');
const notificationStatusSchema = new mongoose.Schema(
  {
    faculty_id: { type: String, required: true, ref: 'faculty_users' },
    notificationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Document' },
    type: { type: String, required: true, enum: ['document','notice'] },
    read: { type: Boolean, default: false },
    body: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NotificationStatus', notificationStatusSchema);