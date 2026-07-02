// src/api/dashboardApi.js

const API_BASE = '/api/dashboard';

export const fetchDashboardStats = () =>
  fetch('/api/dashboard/stats').then(res => res.json());

export const fetchDashboardRecentEntries = () =>
  fetch('/api/dashboard/recent-entries').then(res => res.json());

export const fetchDashboardUsageAnalytics = () =>
  fetch('/api/dashboard/usage-analytics').then(res => res.json());

export const fetchDashboardModuleActivity = () =>
  fetch('/api/dashboard/module-activity').then(res => res.json());

export const fetchDashboardRecentActivity = () =>
  fetch('/api/dashboard/recent-activity').then(res => res.json());

export const fetchDashboardAdminAlerts = () =>
  fetch('/api/dashboard/admin-alerts').then(res => res.json());
