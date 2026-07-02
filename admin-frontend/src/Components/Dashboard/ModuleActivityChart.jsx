// src/components/ModuleActivityChart.jsx

import React from 'react';
import { ResponsiveContainer, CartesianGrid, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      // Tooltip background and text to match the image's general aesthetic for tooltips
      <div className="bg-neutral-700 text-neutral-200 p-2 rounded shadow-lg border border-neutral-600 text-xs">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ModuleActivityChart = ({ moduleActivity }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">Module Activity</h3>
        <p className="text-sm text-neutral-500">Last 30 Days <span className="font-semibold text-green-500">+10%</span></p>
      </div>
      <div className="flex-grow min-h-[250px]"> {/* Ensure chart has space */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={moduleActivity} margin={{ top: 5, right: 0, left: -25, bottom: 5 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar dataKey="activity" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModuleActivityChart;