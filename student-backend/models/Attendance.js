const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
     month: String, 
     percent: Number 
    });
module.exports = mongoose.model('Attendance', AttendanceSchema);