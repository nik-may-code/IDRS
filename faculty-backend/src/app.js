//app.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const admin = require("firebase-admin");
require("dotenv").config(); // Load env vars

// Import individual route files
//const uploadRoutes = require('./routes/upload');
const documentRoutes = require("./routes/documents");
const userRoutes = require("./routes/user_routes");
const noticeRoutes = require("./routes/notice/notice");
const institutionNoticeRoutes = require("./routes/notice/institutionNotice");
const profileRoutes = require("./routes/profile/profile");
const dashboardRoutes = require("./routes/Dashboard/dashboard.routes");
const leaves = require("./routes/leaves.routes");
const notificationRoutes = require("./routes/notifications/notification.routes");
const ticketRoutes = require("./routes/support/ticketRouts");

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized.");
  } catch (e) {
    console.warn("⚠️  Firebase init skipped (service account not found):", e.message);
  }
}

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
//app.use('/api', uploadRoutes);
app.use("/api/leaves", leaves);
app.use("/api/user", userRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/institution-notices", institutionNoticeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", notificationRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api/dashboard", dashboardRoutes);
// ✅ MongoDB Connection
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("FATAL ERROR: DATABASE_URL is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
