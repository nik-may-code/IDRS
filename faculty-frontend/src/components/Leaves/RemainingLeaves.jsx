import React from 'react';

const RemainingLeaves = ({ balances }) => {
  // Handle loading or empty data state
  if (!balances || Object.keys(balances).length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Remaining Leaves</h2>
        <div className="text-center p-4 text-gray-500">
          {balances ? 'No balance data available.' : 'Loading balances...'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Remaining Leaves</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  p-4">
        {Object.entries(balances).map(([type, days]) => (
          <div key={type}>
            <p className="text-3xl font-bold text-gray-900">{days}</p>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemainingLeaves;
