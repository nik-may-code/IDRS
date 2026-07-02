// Controller for dashboard usage analytics
exports.getUsageAnalytics = (req, res) => {
  res.json([
    { name: 'Jan', uv: 400 }, { name: 'Feb', uv: 300 }, { name: 'Mar', uv: 700 },
    { name: 'Apr', uv: 500 }, { name: 'May', uv: 600 }, { name: 'Jun', uv: 350 },
    { name: 'Jul', uv: 550 },
  ]);
};
