import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend);

function Analytics({ attendanceData, submissionData }) {
  const isAttendanceReady = attendanceData && attendanceData.labels?.length > 0;
  const isSubmissionsReady = submissionData && submissionData.labels?.length > 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6" role="region" aria-label="Performance Charts">
      {/* Attendance Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500 mb-1">Attendance Trend</p>
        <h2 className="text-lg font-bold text-green-600 mb-1">+5% from last month</h2>
        <div className="h-48">
          {isAttendanceReady ? (
            <Line data={attendanceData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center h-full">
              Loading attendance data...
            </div>
          )}
        </div>
      </div>

      {/* Submission Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-gray-500 mb-1">Assignment Submissions</p>
        <h2 className="text-lg font-bold text-red-500 mb-1">-3% from last month</h2>
        <div className="h-48">
          {isSubmissionsReady ? (
            <Bar data={submissionData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center h-full">
              Loading submission data...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Analytics;
