// src/components/RecentDataEntriesTable.jsx

import React, { useState } from 'react';
import { FaSyncAlt, FaDownload, FaEye, FaPencilAlt, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'on duty':
      return 'bg-neutral-600 text-neutral-100 border border-neutral-500';
    case 'on leave':
      return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    case 'graduated':
      return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    default:
      return 'bg-neutral-700 text-neutral-300 border border-neutral-600';
  }
};

const RecentDataEntriesTable = ({ recentEntries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // As per the UI

  const paginatedData = (recentEntries.data || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil((recentEntries.totalEntries || 0) / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3 sm:mb-0">Recent Data Entries</h2>
        <div className="flex gap-3">
          <button className="bg-neutral-400 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
            <FaSyncAlt /> Refresh
          </button>
          <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-200">
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">#</th>
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">Name</th>
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">Type</th>
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">Department</th>
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-x font-medium text-neutral-700 font-bold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center text-neutral-500">
                  No recent entries found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-400/50">
                  <td className="p-3 text-sm text-neutral-800">{row.id}</td>
                  <td className="p-3 text-sm text-neutral-800">
                    <div className="flex items-center gap-3">
                      {row.avatarUrl ? (
                        <img src={row.avatarUrl} alt={row.name} className="w-8 h-8 rounded-full object-cover bg-neutral-800" />
                      ) : (
                        <FaUserCircle size={28} className="text-neutral-800" />
                      )}
                      {row.name}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-neutral-800">{row.type}</td>
                  <td className="p-3 text-sm text-neutral-800">{row.department}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClasses(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-neutral-800">
                    <button className="hover:text-neutral-700 mr-2"><FaEye size={18} /></button>
                    <button className="hover:text-neutral-700"><FaPencilAlt size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-white">
        <span className='text-neutral-800'>
          Showing {(recentEntries.totalEntries === 0)
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}
          -
          {Math.min(currentPage * itemsPerPage, recentEntries.totalEntries || 0)} of {recentEntries.totalEntries || 0} entries
        </span>
        <div className="flex items-center gap-1 mt-3 sm:mt-0">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.min(3, totalPages)).keys()].map(i => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${currentPage === pageNumber ? 'bg-neutral-800 text-white' : 'bg-neutral-400 hover:bg-neutral-700'}`}
                disabled={pageNumber > totalPages}
              >
                {pageNumber}
              </button>
            );
          })}
          {totalPages > 3 && <span className="px-2 text-neutral-800">...</span>}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-md bg-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentDataEntriesTable;
