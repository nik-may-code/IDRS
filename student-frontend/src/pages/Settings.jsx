import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';

const Settings = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    studentId: '',
    major: '',
    email: '',
    contactNumber: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('student_email'); // Replace with logged-in user email
        const response = await fetch(`http://localhost:5001/api/auth/getuser/${email}`);
        const data = await response.json();

        if (data.success) {
          setUserData({
            fullName: data.user.name || 'N/A',
            studentId: data.user.studentId || 'N/A',
            major: data.user.major || 'Computer Science',
            email: data.user.email || 'N/A',
            contactNumber: data.user.contactNumber || 'N/A',
            password: '********', // For security, do not show real password
          });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6 border-b-2 border-zinc-200 pb-2">
        Settings
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
        <h2 className="text-lg font-medium text-zinc-900 mb-4">Account Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500">Full Name</p>
            <p className="text-base text-zinc-900">{userData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Student ID</p>
            <p className="text-base text-zinc-900">{userData.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Major</p>
            <p className="text-base text-zinc-900">{userData.major}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Email</p>
            <p className="text-base text-zinc-900">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Contact Number</p>
            <p className="text-base text-zinc-900">{userData.contactNumber}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Password</p>
            <div className="flex items-center gap-2">
              <p className="text-base text-zinc-900">
                *********
              </p>
            </div>
            <NavLink to="/change-password">
            <button
              className="mt-2 px-4 py-1.5 bg-zinc-200 text-zinc-900 text-sm rounded-full hover:bg-zinc-300 transition"
            >
              Update Password
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
