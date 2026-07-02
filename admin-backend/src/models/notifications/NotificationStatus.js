const mongoose = require('mongoose');

const NotificationStatusSchema = new mongoose.Schema({
  faculty_id: { type: String, required: true },
  notificationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String },
  body: { type: String },
  read: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('NotificationStatus', NotificationStatusSchema);
