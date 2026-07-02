const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') }); // Load .env before anything else

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
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
app.use('/uploads', express.static('uploads')); // Optional

// Routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Start server
const PORT = process.env.ALUMNI_PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
