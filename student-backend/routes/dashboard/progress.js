const express = require('express');
const router = express.Router();
const Progress = require('../../models/Progress');

router.get('/', async (req, res) => {
  try {
    const progress = await Progress.find();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

module.exports = router;