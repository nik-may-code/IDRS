// src/components/DashboardHeader.jsx
import React, { useState } from 'react';
import { FaFilter, FaSyncAlt } from 'react-icons/fa';


const DashboardHeader = ({ onRefresh }) => {
  const [showToast, setShowToast] = useState(false);

  const handleRefresh = () => {
    if (onRefresh) onRefresh();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex flex-col">
      {showToast && (
        <div className="fixed left-1/2 z-50 bg-neutral-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out"
             style={{ top: '80px', transform: 'translateX(-50%)' }}>
          Data refreshed!
        </div>
      )}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Dashboard</h1>
          <p className="text-neutral-400 mt-1">
            Welcome to the Institute Data Retrieval System. Manage and retrieve institute data efficiently.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-neutral-800 hover:bg-neutral-700 text-zinc-200 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
            <FaFilter /> Filter
          </button>
          <button
            className="bg-whitex hover:bg-neutral-300 text-neutral-800 font-medium px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            onClick={handleRefresh}
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;