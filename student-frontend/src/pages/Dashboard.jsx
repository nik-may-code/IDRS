import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Progress from '../components/Progress';
import Activity from '../components/Activity';
import axios from 'axios';

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [kpis, setKpis] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user name from localStorage (set during login)
  const userName = localStorage.getItem('user') || 'Student';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use relative /api paths — Vite proxy forwards to localhost:5001
        const [attendanceRes, submissionsRes, kpiRes, activitiesRes, progressRes, announcementsRes] = await Promise.all([
          axios.get('/api/dashboard/attendance'),
          axios.get('/api/dashboard/submissions'),
          axios.get('/api/dashboard/kpis'),
          axios.get('/api/dashboard/activities'),
          axios.get('/api/dashboard/progress'),
          axios.get('/api/dashboard/announcements'),
        ]);

        setAttendanceData({
          labels: attendanceRes.data.map(a => a.month),
          datasets: [{
            label: 'Attendance %',
            data: attendanceRes.data.map(a => a.percent),
            borderColor: '#6B7280',
            backgroundColor: 'transparent',
            tension: 0.4,
          }],
        });

        setSubmissionData({
          labels: submissionsRes.data.map(s => s.month),
          datasets: [{
            label: 'Submissions',
            data: submissionsRes.data.map(s => s.count),
            backgroundColor: '#9CA3AF',
          }],
        });

        setKpis(kpiRes.data);
        setRecentActivities(activitiesRes.data.map(a => ({
          icon: <span className="w-4 h-4 inline mr-1">🔔</span>,
          text: a.text,
        })));
        setCourseProgress(progressRes.data);
        setAnnouncements(announcementsRes.data.map(a => a.message));
      } catch (error) {
        console.error('Dashboard data fetch failed:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-zinc-900 text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in text-zinc-900">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, {userName} 👋</h1>
            <p className="text-sm text-zinc-500 mt-1">Here's your updated academic overview.</p>
          </div>
        </header>

        <Overview kpis={kpis} />

        <Analytics attendanceData={attendanceData} submissionData={submissionData} />

        <Progress courseProgress={courseProgress} />

        <Activity announcements={announcements} recentActivities={recentActivities} />
      </div>
    </Layout>
  );
};

export default Dashboard;