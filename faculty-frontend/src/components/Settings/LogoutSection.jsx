// src/components/Settings/LogoutSection.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';

export default function LogoutSection() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/session
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Also remove user data if you store it

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg flex items-center space-x-2 transition-colors"
    >
      <IoLogOutOutline size={22} />
      <span>Logout</span>
    </button>
  );
}