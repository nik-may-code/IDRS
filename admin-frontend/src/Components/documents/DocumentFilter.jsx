// src/components/documents/DocumentFilter.jsx
import React, { useState } from 'react';

const DocumentFilter = ({ onSearch, onPrint, resetPagination }) => {
  const [filters, setFilters] = useState({
    type: '',
    name: '',
    fromDate: '',
    toDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    if (resetPagination) {
      resetPagination();
    }
    onSearch(filters);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Type</option>
            <option>Journal</option>
            <option>Research Papers</option>
            <option>Course Materials</option>
            <option>Reports</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Enter Document Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleSearchClick}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Print All
        </button>
      </div>
    </div>
  );
};

export default DocumentFilter;
