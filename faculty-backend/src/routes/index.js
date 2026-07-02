// src/routes/index.js
const express = require('express');
const router = express.Router();
const notificationRoutes = require('./notifications/notificationRoutes');
// ✅ Correct path to document routes
const documentRoutes = require('./documents');

router.use('/documents', documentRoutes);

router.use('/', notificationRoutes);
module.exports = router;
