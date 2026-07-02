require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') }); // ✅ MUST be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes");
const documentRoutes = require("./routes/documents");

const app = express();
const PORT = process.env.ADMIN_PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// MongoDB multi-DB connection
const { connectAllDBs } = require("./config/db");
connectAllDBs()
  .then(() => console.log("✅ All MongoDB databases connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", Routes);
// Note: Document routes are already mounted inside Routes (/api/documents)
// So we don't need to mount them again here.

// Root
app.get("/", (req, res) => {
  res.send("🎉 Support Ticket API is running");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
