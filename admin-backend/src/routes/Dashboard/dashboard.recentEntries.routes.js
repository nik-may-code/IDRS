const express = require('express');
const router = express.Router();
const { getRecentEntries } = require('../../controllers/Dashboard/dashboard.recentEntries.controller');

router.get('/', getRecentEntries);

module.exports = router;
