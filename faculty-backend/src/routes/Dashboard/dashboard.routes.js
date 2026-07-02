const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/Dashboard/dashboard.controllers');


router.get('/counts/:facultyId', dashboardController.getCounts);
router.get('/dashboard-analytics/:facultyId', dashboardController.getDashboardAnalytics);


module.exports = router;
