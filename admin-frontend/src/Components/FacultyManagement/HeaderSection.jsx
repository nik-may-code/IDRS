import React from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Faculty Management</h1>
        <p className="text-sm text-gray-500">Manage faculty members, their leaves, actions, and new joinings.</p>
      </div>
      <div className="flex space-x-2">
        <button className="bg-neutral-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm flex items-center">
          <FiFilter className="mr-2" /> Filter
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center">
          <FiRefreshCw className="mr-2" /> Refresh
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;