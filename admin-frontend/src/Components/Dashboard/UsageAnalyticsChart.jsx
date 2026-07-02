// src/components/UsageAnalyticsChart.jsx

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      // Changed tooltip background and text to match the image's general aesthetic for tooltips (often dark with light text)
      <div className="bg-neutral-700 text-neutral-200 p-2 rounded shadow-lg border border-neutral-600 text-xs">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const UsageAnalyticsChart = ({ usageAnalytics }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">Usage Analytics</h3>
        <button className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1 rounded-md border border-neutral-300 hover:bg-neutral-200">
          2025
        </button>
      </div>
      <div className="flex-grow min-h-[250px]"> {/* Ensure chart has space */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usageAnalytics} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              tick={{ fill: '#4b5563', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              tick={{ fill: '#4b5563', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
            <Line type="monotone" dataKey="uv" stroke="#60a5fa" strokeWidth={2.5} dot={{ r: 4, fill: '#60a5fa', strokeWidth:1, stroke: '#ffffff' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageAnalyticsChart;