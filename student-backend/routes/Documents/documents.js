const express = require('express');
const router = express.Router();
const Document = require('../../models/Document');
const bucket = require('../../config/firebaseAdmin');

// Upload document
router.post("/upload", async (req, res) => {
  try {
    const { name, type, category, uploadedBy, date, documentUrl, filePath } = req.body;
    if (!name || !documentUrl || !filePath) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDocument = new Document({
      name,
      type,
      category,
      uploadedBy,
      date,
      documentUrl,
      filePath,
    });

    await newDocument.save();
    res.status(201).json({ message: "Document saved successfully", document: newDocument });
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete by name + remove from Firebase Storage
router.delete('/by-name/:name', async (req, res) => {
  try {
    const doc = await Document.findOne({ name: req.params.name });
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    // Delete file from Firebase Storage
    if (doc.filePath) {
      await bucket.file(doc.filePath).delete();
      console.log('File deleted from Firebase');
    }

    await Document.deleteOne({ name: req.params.name });
    res.status(200).json({ message: 'Document and file deleted successfully' });
  } catch (error) {
    console.error('Error deleting document and file:', error);
    res.status(500).json({ message: 'Server error while deleting document and file' });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ date: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Server error fetching documents' });
  }
});

module.exports = router;
