const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "./serviceAccountKey.json");
let bucket = null;

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "idrs-student.firebasestorage.app",
    });
  }
  bucket = admin.storage().bucket();
} else {
  console.warn("⚠️  Firebase service account key not found. Document upload features will be disabled.");
}

module.exports = bucket;