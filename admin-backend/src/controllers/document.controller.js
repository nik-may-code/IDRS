const DocumentSchema = require('../models/Document');
const { connections } = require('../config/db');
const { format } = require('date-fns');
const NotificationStatus = require('../models/notifications/NotificationStatus');
const User = require('../models/user.model'); // Admin/Faculty user model
const admin = require('firebase-admin');

const { deleteFromFirebase } = require('../middleware/firebaseUpload');

// Helper to dynamically get the Document model based on the target module
const getDocumentModel = (moduleName) => {
  const validModules = ['student', 'faculty', 'alumni'];
  const safeModule = validModules.includes(moduleName) ? moduleName : 'faculty'; // Default to faculty
  
  const conn = connections[safeModule];
  if (!conn) {
    throw new Error(`Database connection for module ${safeModule} not found`);
  }
  
  return conn.models.Document || conn.model('Document', DocumentSchema);
};

// ✅ Upload a document
exports.uploadDocument = async (req, res) => {
  try {
    const {
      moduleName,    // Optional: 'student', 'faculty', 'alumni'
      documentType,
      documentName,
      type,
      volume,
      issue,
      pages,
      publication,
      date,
      remarks,
      visibility,
      uploadedBy,
      category,
      name, // Student sends 'name' instead of 'documentName'
    } = req.body;

    const facultyId = req.headers['x-faculty-id'] || req.body.faculty_id;
    
    // Ensure file and Firebase URL are present
    if (!req.file || !req.file.firebaseUrl) {
      return res.status(400).json({ error: 'File not uploaded to Firebase' });
    }

    const DocumentModel = getDocumentModel(moduleName);

    // Save document details to MongoDB
    const document = new DocumentModel({
      faculty_id: facultyId,
      documentType: documentType || type,
      documentName: documentName || name,
      type,
      volume,
      issue,
      pages,
      publication,
      date: date ? new Date(date) : new Date(),
      remarks,
      visibility,
      uploadedBy,
      category,
      filePath: req.file.firebaseUrl,
      originalName: req.file.originalname,
    });
    
    await document.save();

    // Specific logic for Faculty Notifications
    if (moduleName === 'faculty' || (!moduleName && facultyId)) {
      try {
        const notificationStatus = new NotificationStatus({ 
          faculty_id: facultyId, 
          notificationId: document._id,  
          type: 'document', 
          body: `Your document "${document.documentName}" was uploaded successfully`,
          read: false, 
        });
        await notificationStatus.save();
        
        const user = await User.findOne({ faculty_id: facultyId });
        if (user && user.token) {
          const message = {
            notification: {
              title: 'Document Uploaded',
              body: `Your document "${document.documentName}" was uploaded successfully`,
            },
            token: user.token,
          };
          await admin.messaging().send(message);
        }
      } catch (notifError) {
        console.error('Error sending faculty notification:', notifError);
        // Do not fail the upload just because notification failed
      }
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
    const moduleName = req.query.moduleName || (req.body && req.body.moduleName) || req.headers['x-module-name'];
    const DocumentModel = getDocumentModel(moduleName);

    const documents = await DocumentModel.find().sort({ createdAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

// ✅ Download document (returns Firebase URL)
exports.downloadDocument = async (req, res) => {
  try {
    const moduleName = req.query.moduleName || req.headers['x-module-name'];
    const DocumentModel = getDocumentModel(moduleName);

    const doc = await DocumentModel.findById(req.params.id);

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
exports.deleteDocument = async (req, res) => {
  try {
    const moduleName = req.query.moduleName || (req.body && req.body.moduleName) || req.headers['x-module-name'];
    const DocumentModel = getDocumentModel(moduleName);

    const doc = await DocumentModel.findById(req.params.id);
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

// POST /api/documents/search
exports.searchDocuments = async (req, res) => {
  try {
    const {
      moduleName,
      documentName = '',
      documentType = '',
      type = '',
      fromDate,
      toDate,
      page = 1,
      limit = 5,
    } = req.body;

    const DocumentModel = getDocumentModel(moduleName);
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
    const totalCount = await DocumentModel.countDocuments(query);

    // 📄 Step 2: Then paginate
    const documents = await DocumentModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ results: documents, totalCount });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search documents' });
  }
};
