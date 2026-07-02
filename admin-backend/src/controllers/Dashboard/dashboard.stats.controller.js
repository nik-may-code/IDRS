// Controller for dashboard stats
const mongoose = require("mongoose");
const { connections } = require("../../config/db");

// A generic, non-strict schema for counting users in different databases.
const userSchema = new mongoose.Schema({}, { strict: false });

exports.getStats = async (req, res) => {
  try {
    const studentDbConnection = connections.student;
    const facultyDbConnection = connections.faculty;

    if (!studentDbConnection || !facultyDbConnection) {
      return res
        .status(500)
        .json({ error: "Database connections not initialized." });
    }

    // Define models on their respective connections. This is safe to call multiple times.
    const StudentUser = studentDbConnection.model("user", userSchema, "users");
    const StudentDocument = studentDbConnection.model(
      "StudentDocument",
      userSchema,
      "documents"
    );
    const FacultyUser = facultyDbConnection.model("user", userSchema, "users");
    const FacultyDocument = facultyDbConnection.model(
      "Document",
      userSchema,
      "documents"
    );
    const FacultyLeave = facultyDbConnection.model(
      "FacultyLeave",
      userSchema,
      "faculty_leaves"
    );

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    // Run count queries in parallel for better performance
    const [
      studentCount,
      facultyCount,
      facultyDocumentCount,
      studentDocumentCount,
      approvedLeavesCount,
      pendingLeavesCount,
    ] = await Promise.all([
      StudentUser.countDocuments({
        createdAt: { $gte: startOfYear, $lt: endOfYear },
      }),
      // Fetches the total number of users from the faculty database
      FacultyUser.countDocuments(),
      // Fetches the total number of documents from the faculty database for the current year
      FacultyDocument.countDocuments({
        createdAt: { $gte: startOfYear, $lt: endOfYear },
      }),
      // Fetches the total number of documents from the student database for the current year (using 'date' field)
      StudentDocument.countDocuments({
        date: { $gte: startOfYear, $lt: endOfYear },
      }),
      // Fetches the count of approved leaves from the faculty database
      FacultyLeave.countDocuments({ status: "Approved" }),
      // Fetches the count of pending leave requests from the faculty_leaves collection
      FacultyLeave.countDocuments({ status: "Pending" }),
    ]);

    const totalDocumentCount = facultyDocumentCount + studentDocumentCount;

    res.json([
      {
        icon: "FaUniversity",
        title: "Faculty",
        value: facultyCount,
        description: "Total active faculty",
        iconBgColor: "bg-zinc-700",
      },
      {
        icon: "FaUsers",
        title: "Students",
        value: studentCount,
        description: `Registered in ${currentYear}`,
        iconBgColor: "bg-zinc-700",
      },
      {
        icon: "FaFileAlt",
        title: "Documents",
        value: totalDocumentCount,
        description: `Total in ${currentYear}`,
        iconBgColor: "bg-zinc-700",
      },
      {
        icon: "FaClock",
        title: "Leaves",
        value: approvedLeavesCount,
        description: `Pending Requests-${pendingLeavesCount}`,
        iconBgColor: "bg-zinc-700",
      },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
