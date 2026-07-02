const express = require("express");
const router = express.Router();
const { createJob, getAllJobs } = require("../../controllers/Createnewjob/Createnewjob.job.Controller");

router.post("/", createJob);
router.get("/all", getAllJobs); // <--- This enables GET /api/jobs/all

module.exports = router;
