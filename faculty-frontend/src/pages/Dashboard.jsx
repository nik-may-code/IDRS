import React from "react";
import DashboardContent from "../components/Dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-grow min-h-screen bg-white">
 
      <div className="flex flex-grow bg-[#f4f4f8] p-6">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;