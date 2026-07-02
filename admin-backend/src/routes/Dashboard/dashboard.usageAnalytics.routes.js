const express = require('express');
const router = express.Router();
const { getUsageAnalytics } = require('../../controllers/Dashboard/dashboard.usageAnalytics.controller');

router.get('/', getUsageAnalytics);

module.exports = router;
