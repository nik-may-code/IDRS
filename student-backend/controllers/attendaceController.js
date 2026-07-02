const Attendance = require("../models/Attendance");

// GET all attendance records
const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort("month");
    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ success: false, message: "Error fetching attendance data" });
  }
};

// POST create/update attendance record
const upsertAttendance = async (req, res) => {
  const { month, percent } = req.body;
  if (!month || percent === undefined) {
    return res.status(400).json({ success: false, message: "month and percent are required" });
  }
  try {
    const record = await Attendance.findOneAndUpdate(
      { month },
      { month, percent },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    console.error("Error upserting attendance:", err);
    res.status(500).json({ success: false, message: "Error saving attendance data" });
  }
};

module.exports = { getAttendance, upsertAttendance };
