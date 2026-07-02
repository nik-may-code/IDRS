const mongoose = require('mongoose');
const AnnouncementSchema = new mongoose.Schema({ message: String });
module.exports = mongoose.model('Announcement', AnnouncementSchema);