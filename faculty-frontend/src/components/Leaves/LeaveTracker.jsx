import React, { useState, useMemo } from 'react';
import StatusPill from './StatusPill';

const formatDate = (dateString) => {
  return dateString?.split('T')[0] || '';
};

const LeaveTracker = ({ requests }) => {
  const [filterType, setFilterType] = useState('All Leave Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');

  const filteredRequests = useMemo(() => {
    if (!requests) return [];
    return requests.filter(req => {
      const typeMatch = filterType === 'All Leave Types' || req.leaveType === filterType;
      const statusMatch = filterStatus === 'All Statuses' || req.status === filterStatus;
      return typeMatch && statusMatch;
    });
  }, [requests, filterType, filterStatus]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave Tracker</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div>
          <label htmlFor="filterType" className="block font-medium text-gray-700">Leave Type</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mt-5 mb-3 block w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
          >
            <option>All Leave Types</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Earned Leaves</option>
            <option>Maternity Leaves</option>
          </select>
        </div>

        <div>
          <label htmlFor="filterStatus" className="block font-medium text-gray-700">Status</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="mt-5 mb-3 block w-full md:w-auto rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full align-middle">
          <div className="hidden md:grid grid-cols-5 gap-4 py-2 px-4 bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
            <div>Leave Type</div>
            <div>Reason</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Status</div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No leave requests found.
              </div>
            ) : (
              filteredRequests.map(req => (
                <div key={req._id} className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 px-4 items-center">
                  <div className="md:hidden text-xs font-medium text-gray-500">Leave Type</div>
                  <div className="text-sm text-gray-900 text-right md:text-left">{req.leaveType}</div>

                  <div className="md:hidden text-xs font-medium text-gray-500">Reason</div>
                  <div className="text-sm text-gray-500 text-right md:text-left">{req.reason}</div>

                  <div className="md:hidden text-xs font-medium text-gray-500">Start Date</div>
                  <div className="text-sm text-gray-500 text-right md:text-left">{formatDate(req.startDate)}</div>

                  <div className="md:hidden text-xs font-medium text-gray-500">End Date</div>
                  <div className="text-sm text-gray-500 text-right md:text-left">{formatDate(req.endDate)}</div>

                  <div className="md:hidden text-xs font-medium text-gray-500">Status</div>
                  <div className="text-right md:text-left"><StatusPill status={req.status} /></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTracker;
