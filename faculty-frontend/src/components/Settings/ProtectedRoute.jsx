import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('faculty_token'); // Or your logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
