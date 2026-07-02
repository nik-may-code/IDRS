import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
  roleOptions,
  statusOptions,
}) => {
  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-neutral-900 mb-4">Filters</h2>
      <div className="space-y-5">
        {/* Search Field */}
        <div>
          <label htmlFor="search" className="block text-sm text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or ID"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label htmlFor="role" className="block text-sm text-gray-700 mb-1">Role</label>
          <div className="relative">
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white appearance-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10"
            >
              <option value="">Select Role</option>
              {roleOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="block text-sm text-gray-700 mb-1">Status</label>
          <div className="relative">
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white appearance-none shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10"
            >
              <option value="">Select Status</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
