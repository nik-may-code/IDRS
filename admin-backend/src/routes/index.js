const express = require('express');
const router = express.Router();
const ticketRoutes = require('./support/ticketRouts');
const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);
router.use('/support/tickets', ticketRoutes);   
const dashboardStatsRoutes = require('./Dashboard/dashboard.stats.routes');
const dashboardRecentEntriesRoutes = require('./Dashboard/dashboard.recentEntries.routes');
const dashboardUsageAnalyticsRoutes = require('./Dashboard/dashboard.usageAnalytics.routes');
const dashboardModuleActivityRoutes = require('./Dashboard/dashboard.moduleActivity.routes');
const dashboardRecentActivityRoutes = require('./Dashboard/dashboard.recentActivity.routes');
const dashboardAdminAlertsRoutes = require('./Dashboard/dashboard.adminAlerts.routes');
const alumniRoutes = require('./alumni/alumni');
const documentRoutes = require('./documents');

// Dashboard endpoints
router.use('/dashboard/stats', dashboardStatsRoutes);
router.use('/dashboard/recent-entries', dashboardRecentEntriesRoutes);
router.use('/dashboard/usage-analytics', dashboardUsageAnalyticsRoutes);
router.use('/dashboard/module-activity', dashboardModuleActivityRoutes);
router.use('/dashboard/recent-activity', dashboardRecentActivityRoutes);
router.use('/dashboard/admin-alerts', dashboardAdminAlertsRoutes);
// Alumni endpoints
router.use('/alumni', alumniRoutes);

//student endpoints
const studentRoutes = require('./student/studentRoutes');
const studentDashboardAnalyticsRoutes = require('./student/dashboardAnalytics.routes'); 
router.use('/student-management', studentRoutes);
router.use('/dashboard',studentDashboardAnalyticsRoutes);
//documents endpoints
router.use('/documents', documentRoutes);


module.exports = router;