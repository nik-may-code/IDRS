// src/routes/notice/institutionNotice.js (PROTECTED)

const express = require('express');
const router = express.Router();

// Import both the middleware and the controller function
const authMiddleware = require('../../middleware/auth');
const { getRecentNotices } = require('../../controllers/notice/Institutionnotice/getRecentNotices');

router.get('/', authMiddleware, getRecentNotices);

module.exports = router;