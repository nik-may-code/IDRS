
import React, { useEffect, useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import SummaryCard from "./SummaryCard";
import { getCounts, getDashboardAnalytics } from "../../api/dashboard";
import { useAuth } from "../../context/AuthContext";

export default function DashboardContent() {
  const { user } = useAuth(); 
  const facultyId = user?.faculty_id;

  const [counts, setCounts] = useState({
    documentsUploaded: 0,
    leavesApplied: 0,
    noticesPosted: 0,
  });

  const [analytics, setAnalytics] = useState({
    uploadTrend: [],
    uploadGrowth: 0,
    leaveStatus: [],
    approvalRate: 0,
    approvalRateGrowth: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log("facultyId in fetchData:", facultyId);
      if (!facultyId) {
        console.error("❌ facultyId not found.");
        setLoading(false);
        return;
      }

      try {
        const countsData = await getCounts(facultyId);
        const analyticsData = await getDashboardAnalytics(facultyId);
        setCounts(countsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [facultyId]); 
  return (
    <div className="pt-[10px] pl-[14px] pr-4 pb-4 bg-[#f4f4f8] min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome back, {user?.name || "Dr.Sofia"}
      </h1>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary</h2>

      <div className="flex gap-x-10 mb-10">
        <SummaryCard
          title="Documents Uploaded"
          value={loading ? "Loading..." : counts.documentsUploaded}
        />
        <SummaryCard
          title="Leaves Applied"
          value={loading ? "Loading..." : counts.leavesApplied}
        />
        <SummaryCard
          title="Notices Posted"
          value={loading ? "Loading..." : counts.noticesPosted}
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics</h2>

      <div className="flex" style={{ gap: "60px" }}>
        <AnalyticsCard
          title="Document Uploads Over Time"
          subtitle="Over Past 6 Months"
          value={
            loading
              ? "..."
              : `${analytics.uploadGrowth > 0 ? '+' : ''}${analytics.uploadGrowth}%`
          }
          chartData={analytics.uploadTrend || []}
          chartType="line"
        />
        <AnalyticsCard
          title="Leave Application Status – 2025"
          subtitle={
            analytics.previousApproved === 0
              ? "No data for last year"
              : `Approval Rate: ${analytics.approvalRate}%`
          }
          value={loading ? "..." : `${analytics.approvalRate}%`}
          chartData={analytics.leaveStatus || []}
          chartType="bar"
        />

      </div>
    </div>
  );
}
