// routes/notice/notice.js 

const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth');

const { multer, uploadToFirebase } = require('../../middleware/firebaseUpload'); 

const { createNotice } = require('../../controllers/notice/usernotice/create');
const { getNotices } = require('../../controllers/notice/usernotice/get');
const { updateNotice } = require('../../controllers/notice/usernotice/update');
const { deleteNotice } = require('../../controllers/notice/usernotice/delete');


router.post('/',
  authMiddleware,
  multer.single('attachment'), 
  uploadToFirebase,           
  createNotice                
);


router.put('/:id',
  authMiddleware,
  multer.single('attachment'), 
  uploadToFirebase,            
  updateNotice                
);


router.delete('/:id', authMiddleware, deleteNotice);
router.get('/', authMiddleware, getNotices);

module.exports = router;