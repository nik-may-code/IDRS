// Controller for dashboard recent entries
exports.getRecentEntries = (req, res) => {
  const data = [
    { id: 1, name: 'Alice Kim', type: 'Student', department: 'ECE', status: 'Active', avatarUrl: null },
    { id: 2, name: 'Prof. Ethan Lee', type: 'Faculty', department: 'CSM', status: 'On Duty', avatarUrl: null },
    { id: 3, name: 'Dr. Lisa Wong', type: 'Faculty', department: 'ME', status: 'On Leave', avatarUrl: null },
    { id: 4, name: 'John Doe', type: 'Student', department: 'CSE', status: 'Active', avatarUrl: null },
    { id: 5, name: 'Jane Smith', type: 'Student', department: 'BBA', status: 'Active', avatarUrl: null },
    { id: 6, name: 'Dr. Sarah Johnson', type: 'Faculty', department: 'EEE', status: 'On Duty', avatarUrl: null },
    { id: 7, name: 'Prof. Mark Brown', type: 'Faculty', department: 'CSE', status: 'On Leave', avatarUrl: null },
    { id: 8, name: 'Emily Davis', type: 'Student', department: 'ME', status: 'Active', avatarUrl: null }
  ];
  res.json({
    data, totalEntries: data.length
  });
};
