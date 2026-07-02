// src/Components/Dashboard/RecentActivityFeed.jsx

import React from 'react';
import { UserCircle, HelpCircle, Clock } from 'lucide-react';

const RecentActivityFeed = ({ recentActivity }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-neutral-300 pb-4">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
          <Clock className="mr-2 text-neutral-800" /> Recent Activity
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-400">See More</button>
      </div>
      <div className="space-y-5 flex-grow">
        {recentActivity && recentActivity.length > 0 ? (
          recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <UserCircle size={38} className="text-neutral-600 mt-0.5" />
              <div>
                <p className="text-sm text-neutral-700">
                  <span className="font-semibold text-neutral-800">{activity.activity}</span>
                </p>
                <p className="text-xs text-neutral-500">{activity.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-600">No recent activity.</p>
        )}
      </div>
      <button className="mt-6 w-full bg-neutral-300 hover:bg-neutral-400 text-neutral-700 py-2.5 rounded-md text-sm flex items-center justify-center gap-2">
        <HelpCircle /> View All
      </button>
    </div>
  );
};

export default RecentActivityFeed;