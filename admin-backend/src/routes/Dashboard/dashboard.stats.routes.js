const express = require('express');
const router = express.Router();
const { getStats } = require('../../controllers/Dashboard/dashboard.stats.controller');

router.get('/', getStats);

module.exports = router;
