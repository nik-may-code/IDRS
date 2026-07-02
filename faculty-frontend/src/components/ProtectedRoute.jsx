// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // We need this to check if the user is logged in

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show a loading indicator while the auth status is being checked.
  // This prevents a flicker from the login page to the dashboard on refresh.
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If the user is authenticated, render the nested routes (e.g., AppLayout and its children).
  // The <Outlet /> component is the placeholder for these nested routes.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;