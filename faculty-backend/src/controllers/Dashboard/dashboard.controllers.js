const mongoose = require('mongoose');
const Doc = require('../../models/Document');
const Leave = require('../../models/leaves/LeaveRequest.model');
const Notice = require('../../models/notice');
const User = require('../../models/user_model'); // faculty_users

// Get counts of docs, leaves, notices for a faculty
exports.getCounts = async (req, res) => {
  try {
    const fid = req.params.facultyId.trim();
    // console.log('getCounts for facultyId:', fid);

    // Find user _id for notices
    const user = await User.findOne({ faculty_id: fid }).lean();
    if (!user) {
      // console.log('User not found for faculty_id:', fid);
      return res.status(404).json({ error: 'Faculty not found' });
    }
    // console.log('User _id found:', user._id);

    const docCount = await Doc.countDocuments({ faculty_id: fid });
    const leaveCount = await Leave.countDocuments({ faculty_id: fid });
    const noticeCount = await Notice.countDocuments({ userid: user._id });

    // console.log('Counts - Docs:', docCount, 'Leaves:', leaveCount, 'Notices:', noticeCount);

    res.json({
      documentsUploaded: docCount,
      leavesApplied: leaveCount,
      noticesPosted: noticeCount,
    });
  } catch (err) {
    console.error('getCounts error:', err);
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
};


// Get dashboard analytics (upload trend + leave stats)
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const fid = req.params.facultyId.trim();
    // console.log('getDashboardAnalytics for facultyId:', fid);

    const user = await User.findOne({ faculty_id: fid }).lean();
    if (!user) {
      // console.log('User not found for faculty_id:', fid);
      return res.status(404).json({ error: 'Faculty not found' });
    }

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
const uploads = await Doc.aggregate([
  {
    $match: {
      faculty_id: fid,
      createdAt: { $gte: startOfYear }
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

   

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const uploadTrend = [];
    const uploadCounts = [];

    for (let i = 0; i <= now.getMonth(); i++) {
      const found = uploads.find(u => u._id === i + 1);
      const count = found ? found.count : 0;
      uploadTrend.push({ name: months[i], value: count });
      uploadCounts.push(count);
    }
    // console.log('Upload trend data:', uploadTrend);

    const firstMonthCount = uploadCounts[0] || 0;
    const lastMonthCount = uploadCounts[uploadCounts.length - 1] || 0;
    const uploadGrowth = Math.round(((lastMonthCount - firstMonthCount) / 6) * 100);

    // console.log('Upload growth %:', uploadGrowth);

    // Leave counts for current year by status
    const approved = await Leave.countDocuments({ faculty_id: fid, status: 'Approved', createdAt: { $gte: startOfYear } });
    const pending = await Leave.countDocuments({ faculty_id: fid, status: 'Pending', createdAt: { $gte: startOfYear } });
    const rejected = await Leave.countDocuments({ faculty_id: fid, status: 'Rejected', createdAt: { $gte: startOfYear } });
    // console.log('Leaves this year - Approved:', approved, 'Pending:', pending, 'Rejected:', rejected);

    const leaveStatus = [
      { name: 'Approved', value: approved },
      { name: 'Pending', value: pending },
      { name: 'Rejected', value: rejected },
    ];

    const totalLeaves = approved + pending + rejected;
    const approvalRate = totalLeaves === 0 ? 0 : Math.round((approved / totalLeaves) * 100);
    // console.log('Approval rate %:', approvalRate);

    // Previous years approved leaves count (before current year)
    const previousApproved = await Leave.countDocuments({ faculty_id: fid, status: 'Approved', createdAt: { $lt: startOfYear } });
    // console.log('Previous years approved leaves:', previousApproved);

    const approvalRateGrowth = previousApproved === 0
      ? 0
      : Math.max(-100, Math.round(((approved - previousApproved) / previousApproved) * 100));
    // console.log('Approval rate growth %:', approvalRateGrowth);

    res.json({
      uploadTrend,
      uploadGrowth,
      leaveStatus,
      approvalRate,
      approvalRateGrowth
    });

  } catch (err) {
    console.error('getDashboardAnalytics error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
};