// src/Components/StudentManagement/StudentVisualAnalyticsSection.jsx
import React, { useState, useEffect } from 'react';
import AnalyticsCard from './AnalyticsCard';
import {
  fetchEnrollmentTrends, fetchPlacementStatus,
} from '../../api/StudentManagementApi';

const StudentVisualAnalyticsSection = () => {
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [placementData, setPlacementData] = useState(null);

  useEffect(() => {
    fetchEnrollmentTrends().then(setEnrollmentData);
    fetchPlacementStatus().then(setPlacementData);
  }, []);

  return (
    <section className="mb-8"> 
      <h2 className="text-xl font-semibold text-neutral-700 mb-4">Visual Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <AnalyticsCard title="Enrollment Trends" chartData={enrollmentData} chartType="area" />
        <AnalyticsCard title="Placement Status" chartData={placementData} chartType="bar" />
      </div>
    </section>
  );
};

export default StudentVisualAnalyticsSection;