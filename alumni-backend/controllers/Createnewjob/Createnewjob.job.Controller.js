const JobPosting = require("../../models/JobPosting");

// POST /api/jobs - Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      location,
      jobType,
      description,
      responsibilities,
      qualifications,
    } = req.body;

    if (!jobTitle || !location || !jobType || !description) {
      return res.status(400).json({
        success: false,
        message: "Required: jobTitle, location, jobType, description",
      });
    }

    const newJob = await JobPosting.create({
      jobTitle,
      location,
      jobType,
      description,
      responsibilities,
      qualifications,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating job",
    });
  }
};

// ✅ GET /api/jobs/all - Fetch all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosting.find();
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching jobs",
    });
  }
};
