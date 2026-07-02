// Controller for dashboard admin alerts
exports.getAdminAlerts = (req, res) => {
  res.json([
    { id: 1, message: "System maintenance at midnight." },
    { id: 2, message: "New policy update available." },
    { id: 3, message: "Server backup completed successfully." },
    { id: 4, message: "User registration is now open for the next semester." }
  ]);
};
