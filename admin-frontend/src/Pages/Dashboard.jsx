// src/Dashboard.jsx

import React, { useEffect, useState, useCallback } from "react";
import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import StatsOverview from "../Components/Dashboard/StatsOverview";
import SearchBar from "../Components/Dashboard/SearchBar";
import RecentDataEntriesTable from "../Components/Dashboard/RecentDataEntriesTable";
import UsageAnalyticsChart from "../Components/Dashboard/UsageAnalyticsChart";
import ModuleActivityChart from "../Components/Dashboard/ModuleActivityChart";
import RecentActivityFeed from "../Components/Dashboard/RecentActivityFeed";
import AdminAlertsAndNotices from "../Components/Dashboard/AdminAlertsAndNotices";
import {
  fetchDashboardStats,
  fetchDashboardRecentEntries,
  fetchDashboardUsageAnalytics,
  fetchDashboardModuleActivity,
  fetchDashboardRecentActivity,
  fetchDashboardAdminAlerts,
} from "../api/DashboardApi";

// 🔹 Botpress React Webchat – NEW API
import { Fab, Webchat } from "@botpress/webchat";

const clientId = "4be1af29-10bd-45a4-8139-ff81f1274f82"; // your Botpress client ID

// Optional theming – tweak later if you want
const configuration = {
  color: "#000",
  botName: "Admin Assistant",
  themeMode: "light",
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentEntries, setRecentEntries] = useState({
    data: [],
    totalEntries: 0,
  });
  const [usageAnalytics, setUsageAnalytics] = useState([]);
  const [moduleActivity, setModuleActivity] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [adminAlerts, setAdminAlerts] = useState([]);

  // 🔹 Botpress chat open/close
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const toggleWebchat = () => setIsWebchatOpen((prev) => !prev);

  const fetchAll = useCallback(async () => {
    const [
      statsData,
      recentEntriesData,
      usageAnalyticsData,
      moduleActivityData,
      recentActivityData,
      adminAlertsData,
    ] = await Promise.all([
      fetchDashboardStats(),
      fetchDashboardRecentEntries(),
      fetchDashboardUsageAnalytics(),
      fetchDashboardModuleActivity(),
      fetchDashboardRecentActivity(),
      fetchDashboardAdminAlerts(),
    ]);

    setStats(statsData);
    setRecentEntries({
      data: recentEntriesData.data || [],
      totalEntries: recentEntriesData.totalEntries || 0,
    });
    setUsageAnalytics(usageAnalyticsData);
    setModuleActivity(moduleActivityData);
    setRecentActivity(recentActivityData);
    setAdminAlerts(adminAlertsData);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleRefresh = () => {
    fetchAll();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-100">
      <DashboardHeader onRefresh={handleRefresh} />
      <StatsOverview stats={stats} />
      <SearchBar />
      <RecentDataEntriesTable recentEntries={recentEntries} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <UsageAnalyticsChart usageAnalytics={usageAnalytics} />
        </div>
        <div className="lg:col-span-1">
          <ModuleActivityChart moduleActivity={moduleActivity} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityFeed recentActivity={recentActivity} />
        </div>
      </div>

      <div className="mt-8">
        <AdminAlertsAndNotices adminAlerts={adminAlerts} />
      </div>

      {/* 🔹 Botpress Webchat window */}
      <Webchat
        clientId={clientId}
        configuration={configuration}
        style={{
          width: "400px",
          height: "600px",
          display: isWebchatOpen ? "flex" : "none",
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 50,
        }}
      />

      {/* 🔹 Floating FAB to toggle chat */}
      <Fab
        onClick={toggleWebchat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "64px",
          height: "64px",
          zIndex: 50,
        }}
      />
    </div>
  );
};

export default Dashboard;
