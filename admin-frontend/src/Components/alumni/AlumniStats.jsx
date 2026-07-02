import React, { useContext } from 'react';
import { AlumniContext } from './AlumniProvider';

const AlumniStats = () => {
  const { stats } = useContext(AlumniContext);

  const statCards = [
    { title: 'Total Alumni', value: stats.total || 0 },
    { title: 'Alumni Placed', value: stats.placed || 0 },
    { title: 'Feedback Received', value: stats.feedback || 0 }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col items-center"
        >
          <h3 className="text-sm text-gray-600 mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-black">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AlumniStats;