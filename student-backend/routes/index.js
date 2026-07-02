const express = require("express");
const router = express.Router();

// Import route handlers
const authRoutes = require("./auth");

const attendanceRoutes = require("./dashboard/attendance");
const submissionsRoutes = require("./dashboard/submissions");
const kpisRoutes = require("./dashboard/kpis");
const activitiesRoutes = require("./dashboard/activities");
const progressRoutes = require("./dashboard/progress");
const announcementsRoutes = require("./dashboard/announcements");
const courseDetailRoutes = require("./syllabus/coursedetail");

const courseRoutes = require("./syllabus/courses");
const changepasswordRoutes = require("./settings/changepassword");
const displayUserDetailsRoutes = require("./settings/displayUserDetails");
const documentsRoutes = require("./Documents/documents");

router.use("/auth", authRoutes);
router.use("/auth/changepassword", changepasswordRoutes);
router.use("/auth/getuser", displayUserDetailsRoutes);

router.use("/dashboard/attendance", attendanceRoutes);
router.use("/dashboard/submissions", submissionsRoutes);
router.use("/dashboard/kpis", kpisRoutes);
router.use("/dashboard/activities", activitiesRoutes);
router.use("/dashboard/progress", progressRoutes);
router.use("/dashboard/announcements", announcementsRoutes);


router.use("/syllabus/coursedetail", courseDetailRoutes);
router.use("/syllabus/courses", courseRoutes);
router.use("/documents", documentsRoutes);

module.exports = router;
