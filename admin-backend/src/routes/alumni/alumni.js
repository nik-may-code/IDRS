const express = require('express');
const router = express.Router();
const alumniController = require('../../controllers/alumni/alumniController');

router.get('/', alumniController.getAlumni);
router.post('/', alumniController.addAlumni);
router.get('/stats', alumniController.getStats);

module.exports = router;