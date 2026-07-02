import React from 'react';

const Stats = ({ documents }) => {
  const myUploadsCount = documents.filter(d => d.uploadedBy === localStorage.getItem('student_user')).length;

  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500">My Uploads</p>
        <p className="text-3xl font-bold text-gray-700">{myUploadsCount}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500">Recent Downloads</p>
        <p className="text-3xl font-bold text-gray-700">8</p>
      </div>
    </div>
  );
};

export default Stats;
