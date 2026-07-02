//src/routes/student/dashboardAnalytics.routes.js
const express = require('express');
const router = express.Router();


const getEnrollmentTrends = require('../../controllers/StudentManagement/charts/getEnrollmentTrends.controller');
const getPlacementStatus = require('../../controllers/StudentManagement/charts/getPlacementStatus.controller');


router.get('/analytics/enrollment-trends', getEnrollmentTrends);
router.get('/analytics/placement-status', getPlacementStatus);


module.exports = router;