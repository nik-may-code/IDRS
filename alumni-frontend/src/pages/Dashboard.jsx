import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('alumni_user') || 'Alumni';

  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, eventsRes] = await Promise.all([
          axios.get('/api/jobs/all'),
          axios.get('/api/events/all')
        ]);
        
        if (jobsRes.data.success) {
          setJobs(jobsRes.data.jobs.slice(0, 2)); // Get top 2 recent jobs
        }
        if (eventsRes.data.success) {
          setEvents(eventsRes.data.events.slice(0, 3)); // Get top 3 recent events
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Welcome Message */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}!</h1>
        <p className="text-gray-600 mt-2">
          Stay connected with your alma mater, discover career opportunities, and celebrate alumni achievements.
        </p>
      </div>

      {/* Contributions / Impact (Mock stats for now) */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">My Impact & Contributions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Discussions Started", value: 5 },
            { label: "Replies", value: 23 },
            { label: "Likes Received", value: 47 },
            { label: "Opportunities Posted", value: 2 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-blue-600">{item.value}</p>
              <p className="text-gray-600 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500 bg-white p-4 rounded shadow-sm border border-gray-100">No upcoming events currently.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-blue-100 text-blue-700 flex flex-col items-center justify-center font-bold">
                  <span className="text-xs uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{event.title}</p>
                  <p className="text-gray-600 text-sm line-clamp-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-1">📍 {event.location} | Organized by {event.organizer}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate('/events')} className="mt-4 text-sm text-blue-600 hover:underline font-medium">View All Events</button>
      </div>

      {/* Featured Opportunities */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Job Opportunities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.length === 0 ? (
             <p className="text-gray-500 bg-white p-4 rounded shadow-sm border border-gray-100 col-span-2">No jobs posted recently.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{job.jobTitle}</p>
                  <p className="text-gray-500 text-sm">{job.location} | {job.jobType}</p>
                  <button onClick={() => navigate('/jobs')} className="mt-2 text-sm text-blue-600 font-medium hover:underline">View Job</button>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl">
                  💼
                </div>
              </div>
            ))
          )}
        </div>
        <button onClick={() => navigate('/jobs')} className="mt-4 text-sm text-blue-600 hover:underline font-medium">Browse All Opportunities</button>
      </div>
    </Layout>
  );
};

export default Dashboard;
