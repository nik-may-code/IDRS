const express = require('express');
const router = express.Router();
const { getRecentActivity } = require('../../controllers/Dashboard/dashboard.recentActivity.controller');

router.get('/', getRecentActivity);

module.exports = router;
