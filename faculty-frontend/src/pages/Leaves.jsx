// src/pages/Leaves.jsx

import React, { useState, useEffect } from 'react';
// 1. Import your shared API instance
import api from '../services/api'; 
// 2. Import the hook to get user data
import { useAuth } from '../context/AuthContext'; 

import LeaveApplicationForm from '../components/Leaves/LeaveApplicationForm';
import RemainingLeaves from '../components/Leaves/RemainingLeaves';
import LeaveTracker from '../components/Leaves/LeaveTracker';

const Leaves = () => {
  // 3. Get user object from the context
  const { user } = useAuth(); 
  const [leaveBalances, setLeaveBalances] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 4. Don't fetch if there's no user. Rely on the context.
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        // 5. Use the shared API instance. The base URL and auth token are handled automatically.
        const response = await api.get('/leaves/user');
        
        setLeaveBalances(response.data.leaveBalances);
        setLeaveRequests(response.data.leaveRequests);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Could not load your leave data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]); // 6. The effect should re-run if the user object changes (e.g., on login).

  const handleNewLeave = (newLeave) => {
    setLeaveRequests(prev => [newLeave, ...prev]);
  };

  if (isLoading) {
    return <div className="p-8">Loading Leave Management data...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!user) {
    // This case should theoretically be handled by PrivateRoute, but it's good defensive coding.
    return <div className="p-8">Error: User not found. Please try logging in again.</div>;
  }

   return (
    <div className='bg-white'>
      <div className="px-8 pt-2">
        <header className="mb-12">
          <h1 className="mt-3 text-4xl font-bold text-gray-900">Leave Management</h1>
        </header>

        <main className="space-y-8">
          {/* REMOVE the facultyId prop here. It's no longer needed. */}
          <LeaveApplicationForm onNewLeave={handleNewLeave} />
          <RemainingLeaves balances={leaveBalances} />
          <LeaveTracker requests={leaveRequests} />
        </main>
      </div>
    </div>
  );
};


export default Leaves;