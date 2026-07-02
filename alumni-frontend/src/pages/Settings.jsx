import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Settings = () => {
  const userName = localStorage.getItem("user_name") || "Alumni User";
  const userEmail = localStorage.getItem("user_email") || "alumni@example.com";
  
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    
    try {
      // Expecting alumni token in localStorage for authorization (typically managed by axios interceptors if setup, or we pass it here)
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/user/change-password",
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        setMessage("Password updated successfully!");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage(res.data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Password update error:", error);
      setMessage(error.response?.data?.message || "Error updating password.");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
        {message && (
          <div className={`p-4 mb-6 rounded ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <p className="font-semibold text-gray-800 mt-1">{userName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="font-semibold text-gray-800 mt-1">{userEmail}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            To update your primary profile details, please contact the alumni administration.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
              <input 
                required 
                type="password" 
                name="oldPassword" 
                value={passwords.oldPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
              <input 
                required 
                type="password" 
                name="newPassword" 
                value={passwords.newPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password *</label>
              <input 
                required 
                type="password" 
                name="confirmPassword" 
                value={passwords.confirmPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:ring-blue-500" 
              />
            </div>
            <div>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
