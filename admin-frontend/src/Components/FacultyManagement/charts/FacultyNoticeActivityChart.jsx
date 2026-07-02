import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../shared/CustomTooltip'; // Path updated

const FacultyNoticeActivityChart = ({ data }) => {
  const noticeActivityCount = 30;
  const percentageChange = "-5%";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-700">Faculty Notice Activity</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{noticeActivityCount}</p>
      <p className="text-xs text-red-500 mb-4">Last 6 Months <span className="font-semibold">{percentageChange}</span></p>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="activity" stroke="#60a5fa" strokeWidth={2} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FacultyNoticeActivityChart;