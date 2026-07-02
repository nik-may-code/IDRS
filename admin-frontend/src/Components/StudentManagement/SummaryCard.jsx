// src/Components/StudentManagement/SummaryCard.jsx
import React from 'react';

const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow">
    <h3 className="text-sm text-netural-900 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-neutral-800">{value}</p>
  </div>
);

export default SummaryCard;