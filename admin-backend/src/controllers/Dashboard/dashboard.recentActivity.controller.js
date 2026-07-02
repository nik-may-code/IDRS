// Controller for dashboard recent activity
exports.getRecentActivity = (req, res) => {
  res.json([
    { id: 1, activity: "User logged in", time: "2 hours ago" },
    { id: 2, activity: "Document uploaded", time: "1 hour ago" },
    { id: 3, activity: "Leave request submitted", time: "30 minutes ago" },
    { id: 4, activity: "User updated profile", time: "15 minutes ago" }
  ]);
};
