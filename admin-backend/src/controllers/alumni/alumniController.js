const Alumni = require('../../models/alumni/Alumni');

// Get all alumni
exports.getAlumni = async (req, res) => {
  const alumni = await Alumni.find();
  res.json(alumni);
};

// Add new alumni
exports.addAlumni = async (req, res) => {
  const newAlumni = new Alumni(req.body);
  await newAlumni.save();
  res.status(201).json(newAlumni);
};

// Get alumni stats
exports.getStats = async (req, res) => {
  const total = await Alumni.countDocuments();
  const placed = await Alumni.countDocuments({ placementData: 'Placed' });
  const feedback = await Alumni.countDocuments({ feedbackStatus: 'Submitted' });
  // Add more stats as needed
  res.json({
    total,
    placed,
    feedback,
    activeMentors: 150,
    engagedAlumni: 950,
    upcomingEvents: 3
  });
};