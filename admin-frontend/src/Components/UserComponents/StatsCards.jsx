import React from 'react';

const StatsCards = ({ users }) => {
  const statsData = [
    { title: 'Total Users', value: users.length.toString() },
    { title: 'Active Users', value: users.filter((u) => u.status === 'Active').length.toString() },
    { title: 'Inactive Users', value: users.filter((u) => u.status === 'Inactive').length.toString() },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-100 hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-sm text-gray-600 mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;