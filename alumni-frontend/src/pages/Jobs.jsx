import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isPosting, setIsPosting] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    location: "",
    jobType: "Full-Time",
    description: "",
    responsibilities: "",
    qualifications: "",
  });

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/jobs/all");
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jobs", newJob);
      if (response.data.success) {
        setIsPosting(false);
        setNewJob({
          jobTitle: "",
          location: "",
          jobType: "Full-Time",
          description: "",
          responsibilities: "",
          qualifications: "",
        });
        fetchJobs(); // Refresh jobs list
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("Failed to post job. Please check all required fields.");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Alumni Job Board</h1>
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isPosting ? "Cancel" : "Post a Job"}
          </button>
        </div>

        {isPosting && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Post a New Opportunity</h2>
            <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input required type="text" name="jobTitle" value={newJob.jobTitle} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="e.g. Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input required type="text" name="location" value={newJob.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="e.g. Remote, New York" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                <select name="jobType" value={newJob.jobType} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required name="description" value={newJob.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="Overview of the role..."></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                <textarea name="responsibilities" value={newJob.responsibilities} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="What will the person do?"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <textarea name="qualifications" value={newJob.qualifications} onChange={handleInputChange} rows="2" className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="Required skills and experience..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition">
                  Submit Job Posting
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No jobs posted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">📍 {job.location}</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">💼 {job.jobType}</span>
                    <span className="text-gray-400">📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm whitespace-pre-wrap">{job.description}</p>
                </div>
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition w-full md:w-auto">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
