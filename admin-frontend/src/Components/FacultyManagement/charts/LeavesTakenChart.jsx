import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../shared/CustomTooltip'; // Path updated

const LeavesTakenChart = ({ data }) => {
  const totalLeaves = 150; 
  const percentageChange = "+10%";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-700">Leaves Taken by Department/Month</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{totalLeaves}</p>
      <p className="text-xs text-green-500 mb-4">Last 12 Months <span className="font-semibold">{percentageChange}</span></p>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
            <Bar dataKey="leaves" fill="#8884d8" barSize={15} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeavesTakenChart;