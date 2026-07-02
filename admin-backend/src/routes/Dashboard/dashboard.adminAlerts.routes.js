const express = require('express');
const router = express.Router();
const { getAdminAlerts } = require('../../controllers/Dashboard/dashboard.adminAlerts.controller');

router.get('/', getAdminAlerts);

module.exports = router;
