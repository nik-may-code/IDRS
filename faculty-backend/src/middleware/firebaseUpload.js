const admin = require('firebase-admin');
const Multer = require('multer');
const serviceAccount = require('../../serviceAccountKey.json');

//1. INITIALIZE FIREBASE ADMIN 
if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "notifyexport.firebasestorage.app"  // ✅ Correct format


  });
}
const bucket = admin.storage().bucket();

//2. CONFIGURE MULTER 
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

//3. UPLOAD TO FIREBASE 
const uploadToFirebase = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileName = `${Date.now()}-${req.file.originalname.replace(/ /g, "_")}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    metadata: { contentType: req.file.mimetype },
    resumable: false
  });

  blobStream.on('error', (err) => next(err));

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    try {
      await blob.makePublic();
      req.file.firebaseUrl = publicUrl;
      next();
    } catch (error) {
      next(error);
    }
  });

  blobStream.end(req.file.buffer);
};

//4. NEW: DELETE FROM FIREBASE
const deleteFromFirebase = async (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== 'string') {
    return;
  }

  try {
   
    const fileName = new URL(fileUrl).pathname.split('/').pop();

    if (fileName) {
      await bucket.file(fileName).delete();
      console.log(`Successfully deleted ${fileName} from Firebase Storage.`);
    }
  } catch (error) {
    
    if (error.code === 404) {
      console.warn(`Attempted to delete a file that does not exist: ${fileUrl}`);
    } else {
      console.error("Error deleting file from Firebase:", error);
    }
  }
};


module.exports = {
  multer,
  uploadToFirebase,
  deleteFromFirebase, 
};