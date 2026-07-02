const Document = require('../models/Document');

const { format } = require('date-fns');
const NotificationStatus = require('../models/notifications/NotificationStatus');
const User = require('../models/user_model');
const admin = require('firebase-admin');

const { deleteFromFirebase } = require('../middleware/firebaseUpload');

// ✅ Upload a document
// ✅ Upload a document
exports.uploadDocument = async (req, res) => {
  try {
    const {
      documentType,
      documentName,
      type,
      volume,
      issue,         // ✅ added
      pages,         // ✅ added
      publication,
      date,
      remarks,
      visibility,
    } = req.body;

    const facultyId = req.headers['x-faculty-id'] || req.body.faculty_id;
    // Ensure file and Firebase URL are present
    if (!req.file || !req.file.firebaseUrl) {
      return res.status(400).json({ error: 'File not uploaded to Firebase' });
    }
    // Save document details to MongoDB

    const document = new Document({
      faculty_id: facultyId,
      documentType,
      documentName,
      type,
      volume,
      issue,        // ✅ added
      pages,        // ✅ added
      publication,
      date: new Date(date),
      remarks,
      visibility,
      filePath: req.file.firebaseUrl,
      originalName: req.file.originalname,
    });
    
    await document.save();
    const notificationStatus = new NotificationStatus({ faculty_id: facultyId, notificationId: document._id,  type: 'document', body: `Your document "${documentName}" was uploaded successfully`,read: false, });
    await notificationStatus.save();
    const user = await User.findOne({ faculty_id: facultyId });
    if (user && user.token) {
      const message = {
        notification: {
          title: 'Document Uploaded',
          body: `Your document "${documentName}" was uploaded successfully`,
        },
        token: user.token,
      };
      await admin.messaging().send(message);
    }
    res.status(201).json({
      message: 'Document uploaded successfully',
      document,
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
};

// ✅ Get all documents (Unpaginated - optional)
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

// ✅ Search with filters + pagination
exports.searchDocuments = async (req, res) => {
  try {
    const {
      documentName,
      documentType,
      type,
      fromDate,
      toDate,
      page = 1,
      limit = 5,
    } = req.body;

    const query = {};

    if (documentName) {
      query.documentName = { $regex: documentName, $options: 'i' };
    }
    if (documentType) {
      query.documentType = documentType;
    }
    if (type) {
      query.type = type;
    }
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = new Date(fromDate);
      if (toDate) query.date.$lte = new Date(toDate);
    }

    const skip = (page - 1) * limit;

    const [results, totalCount] = await Promise.all([
      Document.find(query).sort({ date: -1 }).skip(skip).limit(Number(limit)),
      Document.countDocuments(query),
    ]);

    res.status(200).json({ results, totalCount });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search documents' });
  }
};

// ✅ Download document (returns Firebase URL)
exports.downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({
      url: doc.filePath,
      originalName: doc.originalName,
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to retrieve document' });
  }
};

// ✅ Delete a document (MongoDB + Firebase)
// ...existing code...

// ✅ Delete a document (MongoDB + Firebase)
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete from Firebase if needed
    if (doc.filePath) {
      await deleteFromFirebase(doc.filePath);
    }

    await doc.deleteOne();

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
// ...existing code...
// POST /api/documents/search
exports.searchDocuments = async (req, res) => {
  try {
    const {
      documentName = '',
      documentType = '',
      type = '',
      fromDate,
      toDate,
      page = 1,
      limit = 5,
    } = req.body;

    const query = {};

    if (documentName.trim()) {
      query.documentName = { $regex: documentName, $options: 'i' };
    }

    if (documentType.trim()) {
      query.documentType = { $regex: documentType, $options: 'i' };
    }

    if (type.trim()) {
      query.type = { $regex: type, $options: 'i' };
    }

    if (fromDate && toDate) {
      query.date = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    // 🔍 Step 1: Filter first
    const totalCount = await Document.countDocuments(query);

    // 📄 Step 2: Then paginate
    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ results: documents, totalCount });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search documents' });
  }
};
