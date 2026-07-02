const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');

router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().sort('month');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance data' });
  }
});

module.exports = router;