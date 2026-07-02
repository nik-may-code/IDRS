
const admin = require('firebase-admin');
const User = require('../../models/user_model');
const NotificationStatus = require('../../models/notifications/NotificationStatus');
const Document = require('../../models/Document');

exports.storeSub = async (req, res) => {
  try {
    const { faculty_id, token } = req.body || {};
    const user = await User.findOneAndUpdate({ faculty_id }, { token }, { upsert: true, new: true } );
    res.status(200).json({ message: 'Subscription stored' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { faculty_id, token, title, body } = req.body || {};
    const message = { notification: { title, body },token, };
    await admin.messaging().send(message);
    await new NotificationStatus({ faculty_id, notificationId: new Date().getTime().toString(), type: 'manual', read: false, }).save();
    res.status(200).json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

exports.getNotificationStatus = async (req, res) => {
  try {
    const faculty_id = (req.headers && req.headers['x-faculty-id']) || (req.body && req.body.faculty_id);
    const statuses = await NotificationStatus.find({ faculty_id }).sort({ createdAt: -1 });
    res.status(200).json(statuses); } 
  catch (err) {
    res.status(500).json({ error: 'Failed to fetch status'});
  }
};

exports.markRead = async (req, res) => {
  try {
    const { faculty_id, notificationId } = req.body || {};
    const status = await NotificationStatus.findOneAndUpdate(
      { faculty_id, notificationId },{ read: true }, { new: true });
    res.status(200).json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark as read'});
  }
};
exports.deleteAll = async (req, res) => {
  try {
    const facultyId = req.headers['x-faculty-id'];
    await NotificationStatus.deleteMany({ faculty_id: facultyId });
    res.status(200).json({ message: 'Notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
