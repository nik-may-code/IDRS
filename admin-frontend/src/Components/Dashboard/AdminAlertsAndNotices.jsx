// src/Components/Dashboard/AdminAlertsAndNotices.jsx

import React from 'react';

const AdminAlertsAndNotices = ({ adminAlerts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-neutral-800">Admin Alerts and Notices</h2>
        <button
          className="bg-neutral-800 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        >
          Send Notice
        </button>
      </div>
      <div className="mt-4 border-t border-zinc-300 pt-4">
        {adminAlerts && adminAlerts.length > 0 ? (
          <ul className="space-y-2">
            {adminAlerts.map((alert) => (
              <li key={alert.id} className="text-neutral-700 text-base">
                <span className="font-medium text-neutral-800">Alert:</span> {alert.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-600">No current alerts.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAlertsAndNotices;