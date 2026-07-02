//src/config/db.js
const mongoose = require("mongoose");

const studentDbUri =
  "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/idrs-copy?retryWrites=true&w=majority";
const alumniDbUri =
  "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/alumni-module-copy?retryWrites=true&w=majority";
const facultyDbUri =
  "mongodb+srv://nikhil:nikhil%4024@idrs.3bjohvf.mongodb.net/faculty-module-copy?retryWrites=true&w=majority";

const connections = {};

const connectAllDBs = async () => {
  try {
    if (process.env.ADMIN_MONGO_URI) {
      await mongoose.connect(process.env.ADMIN_MONGO_URI);
      console.log("Connected to Admin DB (default)");
    } else {
      console.warn("MONGO_URI not found in environment, default connection skipped");
    }

    connections.student = await mongoose.createConnection(studentDbUri);
    console.log("Connected to Student DB");

    connections.alumni = await mongoose.createConnection(alumniDbUri);
    console.log("Connected to Alumni DB");

    connections.faculty = await mongoose.createConnection(facultyDbUri);
    console.log("Connected to Faculty DB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = {
  connectAllDBs,
  connections,
};
