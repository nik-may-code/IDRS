const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCounts = async (facultyId) => {
  const response = await fetch(`${BASE_URL}/dashboard/counts/${facultyId}`);
  if (!response.ok) throw new Error('Failed to fetch counts');
  return await response.json();
};

export const getDashboardAnalytics = async (facultyId) => {
  const response = await fetch(`${BASE_URL}/dashboard/dashboard-analytics/${facultyId}`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return await response.json();
};