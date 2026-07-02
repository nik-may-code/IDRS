const express = require("express");
const router = express.Router();

const authRoutes = require("./auth"); 
const jobRoutes = require("./Createnewjob/Createnewjob.job.routes");
const changePasswordRoutes = require("./ChangePassword");
const eventRoutes = require("./events.routes");
const achievementRoutes = require("./achievements.routes");
const discussionRoutes = require("./discussions.routes");

router.use("/auth", authRoutes); 
router.use("/jobs", jobRoutes); 
router.use("/user", changePasswordRoutes); 
router.use("/events", eventRoutes);
router.use("/achievements", achievementRoutes);
router.use("/discussions", discussionRoutes);

module.exports = router;
