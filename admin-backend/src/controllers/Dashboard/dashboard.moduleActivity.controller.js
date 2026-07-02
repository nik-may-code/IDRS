// Controller for dashboard module activity
exports.getModuleActivity = (req, res) => {
  res.json([
    { name: 'Jan', activity: 65 }, { name: 'Feb', activity: 59 }, { name: 'Mar', activity: 85 },
    { name: 'Apr', activity: 81 }, { name: 'May', activity: 56 }, { name: 'Jun', activity: 55 },
    { name: 'Jul', activity: 70 },
  ]);
};
