// src/Components/StudentManagement/StudentSummarySection.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import SummaryCard from './SummaryCard';
import { fetchStudentSummary } from '../../api/StudentManagementApi';


const StudentSummarySection = ({ activeFilters }) => {
  const [summaryData, setSummaryData] = useState({
    totalStudents: 0,
    graduatedStudents: 0,
    studentsPlaced: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchStudentSummary(activeFilters)
      .then(data => {
        setSummaryData({
          totalStudents: data.totalStudents || 0,
          graduatedStudents: data.graduatedStudents || 0,
          studentsPlaced: data.studentsPlaced || 0,
        });
      })
      .catch(err => {
        console.error("Failed to fetch student summary:", err); // It's good practice to log the actual error
        setError(err.message || "Failed to fetch student summary.");
        setSummaryData({ totalStudents: 0, graduatedStudents: 0, studentsPlaced: 0 });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeFilters]); // The dependency array ensures this effect runs when activeFilters change

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">Student Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center text-neutral-500">Loading...</div>
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center text-neutral-500">Loading...</div>
          <div className="bg-gray-100 p-4 rounded-lg shadow text-center text-neutral-500">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">Student Overview</h2>
        <div className="text-center p-4 text-red-500 bg-red-50 rounded-md">
          Could not load summary data: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-neutral-900 ml-2 mb-4">Student Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Students" value={summaryData.totalStudents} />
        <SummaryCard title="Graduated Students" value={summaryData.graduatedStudents} />
        <SummaryCard title="Students Placed" value={summaryData.studentsPlaced} />
      </div>
    </section>
  );
};

export default StudentSummarySection;