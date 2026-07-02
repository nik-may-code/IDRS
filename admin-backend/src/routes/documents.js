const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

// ✅ Import correctly from middleware
const { multer, uploadToFirebase } = require('../middleware/firebaseUpload');

// 📌 Use both middlewares in the correct order
router.post(
  '/upload',
  multer.single('file'),
  uploadToFirebase,
  documentController.uploadDocument
);

// Other routes
router.get('/all', documentController.getDocuments);
router.get('/:id', documentController.downloadDocument);
router.delete('/:id', documentController.deleteDocument);
router.post('/search', documentController.searchDocuments);

module.exports = router;
