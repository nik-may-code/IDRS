import React from 'react';
import LeavesTakenChart from './charts/LeavesTakenChart';
import FacultyNoticeActivityChart from './charts/FacultyNoticeActivityChart';
import FacultyHeadcountGrowthChart from './charts/FacultyHeadcountGrowthChart';

const VisualAnalyticsSection = ({
  leavesByMonthData,
  facultyNoticeActivityData,
  facultyHeadcountGrowthData,
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Visual Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeavesTakenChart data={leavesByMonthData} />
        <FacultyNoticeActivityChart data={facultyNoticeActivityData} />
      </div>
      <FacultyHeadcountGrowthChart data={facultyHeadcountGrowthData} />
    </section>
  );
};

export default VisualAnalyticsSection;