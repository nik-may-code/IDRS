const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "idrs-student.firebasestorage.app", // Replace with your bucket
});

const bucket = admin.storage().bucket();

module.exports = bucket;