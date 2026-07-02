// src/pages/Settings.jsx

import React from 'react';
import AccountSecurity from '../components/Settings/AccountSecurity';
import LogoutSection from '../components/Settings/LogoutSection';

export default function Settings() {
  return (
    <div className="p-10 w-full max-w-5xl text-black text-left">
      <h2 className="text-4xl font-bold mb-8">Settings</h2>
      
      <AccountSecurity />

      {/* This container ensures the Logout button is aligned to the right */}
      <div className="flex justify-end mt-8">
        <LogoutSection />
      </div>
    </div>
  );
}