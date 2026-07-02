// src/components/StatsOverview.jsx


import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import { FaUniversity, FaUsers, FaFileAlt, FaClock } from 'react-icons/fa';

// Map icon names to actual components
const iconMap = {
  FaUniversity: FaUniversity,
  FaUsers: FaUsers,
  FaFileAlt: FaFileAlt,
  FaClock: FaClock,
};

const StatsOverview = ({ stats }) => {
  const navigate = useNavigate();

  // Normalize title for matching (case-insensitive, ignore whitespace)
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, '');

  const handleCardClick = (title) => {
    const norm = normalize(title);
    if (norm.includes('faculty')) {
      navigate('/faculty');
    } else if (norm.includes('student')) {
      navigate('/student');
    }
    // Add more navigation logic if needed for other cards
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{ cursor: (normalize(stat.title).includes('faculty') || normalize(stat.title).includes('student')) ? 'pointer' : 'default' }}
          onClick={() => handleCardClick(stat.title)}
        >
          <StatCard
            icon={iconMap[stat.icon]}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            iconBgColor={stat.iconBgColor}
          />
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
