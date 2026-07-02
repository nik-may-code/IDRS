const express = require('express');
const router = express.Router();
const { getauth, login } = require('../controllers/auth.controller');

router.get('/', getauth);
router.post('/login', login);

module.exports = router;
