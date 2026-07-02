// src/Components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Bell, UserCircle } from 'lucide-react'; // HelpCircle is not used in header based on image
import { useNavigate } from 'react-router-dom';

// A more representative SVG for the IDRS logo icon based on the image
const IDRSActualLogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 3.05" /* Approx for broken circle effect */ />
     {/* Inner broken circle - adjust dasharray for effect */}
    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 2.2" />
  </svg>
);

const Header = () => {

  const navigate = useNavigate()

  const [activePopup, setActivePopup] = useState(null); // null, 'help', 'admin', 'notifications'
  const popupRef = useRef(null);

  const togglePopup = (popupName) => {
    setActivePopup(activePopup === popupName ? null : popupName);
  };

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Check if the click was on one of the toggle buttons
        const isToggleButton = event.target.closest('button[data-popup-toggle]');
        if (!isToggleButton) {
          setActivePopup(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-neutral-900 text-white h-16 flex items-center justify-between px-6 shadow-md fixed top-0 left-0 right-0 z-20">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 p-1 bg-neutral-800 rounded-md">
          <div className="p-1 bg-white rounded">
            <IDRSActualLogoIcon />
          </div>
          <span className="font-semibold text-lg">IDRS</span>
        </div>
        <div className="bg-neutral-800 px-3 py-1.5 rounded-md">
          <span className="text-sm text-gray-300">Institute Data Retrieval System</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-5">
        {/* Notices Button */}
        <div className="relative">
          <button
            data-popup-toggle
            onClick={() => navigate("/notices")}
            className="flex items-center bg-neutral-800 hover:bg-neutral-700 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer"
          >
            Notices
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            data-popup-toggle
            onClick={() => togglePopup('notifications')}
            className="hover:bg-neutral-700 p-2 rounded-full relative"
          >
            <Bell size={22} className="text-gray-300" />
            {/* Notification dot example */}
            <span className="absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-neutral-900" />
          </button>
          {activePopup === 'notifications' && (
            <div ref={popupRef} className="absolute top-full right-0 mt-2 w-72 bg-white text-neutral-800 rounded-md shadow-xl p-3 z-30 text-sm">
              <p className="font-semibold mb-2">Recent Notifications</p>
              <ul className="space-y-2">
                <li className="border-b border-gray-200 pb-1">System update scheduled.</li>
                <li className="border-b border-gray-200 pb-1">New report generated.</li>
                <li>User 'john.doe' logged in.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="relative">
          <button
            data-popup-toggle
            onClick={() => togglePopup('admin')}
            className="flex items-center space-x-2 hover:bg-neutral-700 p-1 rounded-full"
          >
            <UserCircle size={30} className="text-gray-300" />
            <span className="text-sm font-medium">Admin</span>
          </button>
          {activePopup === 'admin' && (
            <div ref={popupRef} className="absolute top-full right-0 mt-2 w-48 bg-white text-neutral-800 rounded-md shadow-xl p-3 z-30 text-sm">
              <p className="font-semibold">Welcome, Admin!</p>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:text-blue-600">Profile</a></li>
                <li><a href="#" className="hover:text-blue-600">Settings</a></li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;