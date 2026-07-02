// src/components/Settings/AccountSecurity.jsx

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AccountSecurity() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // This handler just moves to the next UI step.
  const handleContinue = (e) => {
    e.preventDefault();
    if (passwords.current.trim() === '') {
      alert('Please enter your current password.');
      return;
    }
    setIsCurrentPasswordVerified(true);
  };

  // This handler calls the new backend endpoint to update the password.
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    if (!passwords.new || passwords.new.length < 6) {
      alert("Please enter a new password (at least 6 characters).");
      return;
    }
    
    setIsLoading(true);

    try {
      const token = localStorage.getItem('faculty_token');
      if (!token) {
        alert('Authentication error. Please log in again.');
        setIsLoading(false);
        return;
      }

      // Calling the new /api/settings endpoint
      const response = await fetch('http://localhost:3000/api/settings/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // Send the JWT token
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific errors from the backend (e.g., "Incorrect current password")
        throw new Error(data.message || 'Failed to update password.');
      }

      alert("Password updated successfully!");
      // Reset the form
      setIsCurrentPasswordVerified(false);
      setPasswords({ current: '', new: '', confirm: '' });

    } catch (error) {
      console.error("Password update failed:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Account Security</h2>
      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <div className="relative">
            <input
              type={showPassword.current ? 'text' : 'password'}
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              disabled={isCurrentPasswordVerified || isLoading} // Disable when loading
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => toggleShow('current')}
              disabled={isCurrentPasswordVerified || isLoading}
            >
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {!isCurrentPasswordVerified && (
            <div className="text-sm text-right mt-1">
              <button type="button" className="text-black-600 hover:underline">
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        {/* Conditionally render New and Confirm Password fields */}
        {isCurrentPasswordVerified && (
          <>
            {/* New Password */}
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => toggleShow('new')}
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => toggleShow('confirm')}
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Action Button Container */}
        <div className="flex justify-end">
          {!isCurrentPasswordVerified ? (
            <button
              onClick={handleContinue}
              disabled={isLoading || !passwords.current}
              className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleUpdatePassword}
              disabled={isLoading}
              className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update password'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}