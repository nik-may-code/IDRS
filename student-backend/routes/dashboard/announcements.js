const express = require('express');
const router = express.Router();
const Announcement = require('../../models/Announcements');

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

module.exports = router;