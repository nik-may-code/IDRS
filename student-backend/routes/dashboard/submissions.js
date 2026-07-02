const express = require('express');
const router = express.Router();
const Submission = require('../../models/Submission');

router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().sort('month');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
});

module.exports = router;
