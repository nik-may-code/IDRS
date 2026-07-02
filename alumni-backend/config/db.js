const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.ALUMNI_MONGO_URI ||
      "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/alumni-module-copy";
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
