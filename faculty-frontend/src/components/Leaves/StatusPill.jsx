  import React from 'react';

  const StatusPill = ({ status }) => {
    const statusStyles = {
      Approved: 'bg-green-100 text-green-800',
      Pending: 'bg-indigo-100 text-indigo-700',
      Rejected: 'bg-red-100 text-red-800', 
    };

    return (
      <span
        className={`px-3 py-1 inline-block text-xs font-medium rounded-full ${
          statusStyles[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  export default StatusPill;