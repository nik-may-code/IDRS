// routes/profile/profile.js

const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { multer, uploadToFirebase } = require('../../middleware/firebaseUpload'); 

const { getProfile } = require('../../controllers/profile/view');
const { updateProfile } = require('../../controllers/profile/edit');


router.get('/', auth, getProfile);

router.put(
  '/',
  auth,                     
  multer.single('photo'),   
  uploadToFirebase,         
  updateProfile             
);

module.exports = router;