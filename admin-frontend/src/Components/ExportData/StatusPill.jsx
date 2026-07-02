import React from 'react';

const StatusPill = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-neutral-900';

  if (status === 'Completed') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
  } else if (status === 'Processing') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-700';
  } else if (status === 'Failed') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default StatusPill;
