import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../shared/CustomTooltip'; // Path updated

const FacultyHeadcountGrowthChart = ({ data }) => {
  const growthFigure = 5; 
  const percentageChange = "+20%";

  return (
    <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h3 className="text-md font-semibold text-gray-700">Faculty Headcount Growth</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{growthFigure}</p>
      <p className="text-xs text-green-500 mb-4">Last 5 Years <span className="font-semibold">{percentageChange}</span></p>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis dataKey="year" type="category" tick={{ fontSize: 10 }} width={50} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
            <Bar dataKey="count" fill="#6a7282" barSize={20} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FacultyHeadcountGrowthChart;