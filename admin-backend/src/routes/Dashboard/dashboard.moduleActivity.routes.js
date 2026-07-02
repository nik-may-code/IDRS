const express = require('express');
const router = express.Router();
const { getModuleActivity } = require('../../controllers/Dashboard/dashboard.moduleActivity.controller');

router.get('/', getModuleActivity);

module.exports = router;
