// src/components/StatCard.jsx
import React from 'react';

const StatCard = ({ icon: Icon, title, value, description}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex-1 min-w-[220px]">
      <div className="flex items-center mb-3">
        <div className={`p-3 rounded-full mr-4 bg-neutral-900`}>
          <Icon size={15} className="text-white"  />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-neutral-900 mb-1">{value}</p>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
};

export default StatCard;