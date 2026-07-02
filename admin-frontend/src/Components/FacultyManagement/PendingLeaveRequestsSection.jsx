import React from 'react';

const PendingLeaveRequestsSection = ({ pendingLeaveRequestsData }) => {
  return (
    <section className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Faculty Name', 'Department', 'Start Date', 'End Date', 'Reason', 'Status', 'Actions'].map(header => (
                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingLeaveRequestsData.length > 0 ? pendingLeaveRequestsData.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900">{request.facultyName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{request.department}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{request.startDate}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{request.endDate}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{request.reason}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                  <button className="text-red-600 hover:text-red-900">Reject</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="text-center text-gray-500 py-4">No pending leave requests.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PendingLeaveRequestsSection;