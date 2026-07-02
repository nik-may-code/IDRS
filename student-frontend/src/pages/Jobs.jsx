import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/jobs/all");
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

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Alumni Job Board</h1>
        </div>

        <p className="text-gray-500 mb-8">
          Explore job opportunities shared by our alumni network.
        </p>

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
