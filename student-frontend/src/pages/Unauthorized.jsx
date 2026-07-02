// src/pages/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">Please login first to access this page.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-5 py-2 rounded hover:opacity-90"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
