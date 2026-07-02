// src/Components/SideNav.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Landmark,
  GraduationCap,
  Users,
  FileText,
  Settings,
  UserCog,
  Download,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const handleSupportClick = () => {
    navigate('/support');
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/faculty', label: 'Faculty', icon: <Landmark size={20} /> },
    { to: '/student', label: 'Student', icon: <GraduationCap size={20} /> },
    { to: '/alumni', label: 'Alumni', icon: <Users size={20} /> },
    { to: '/documents', label: 'Documents', icon: <FileText size={20} /> },
    { to: '/user-management', label: 'User Management', icon: <UserCog size={20} /> },
    { to: '/export-data', label: 'Export Data', icon: <Download size={20} /> },
    { to: '/system-settings', label: 'System Settings', icon: <Settings size={20} /> },
  ];

  const commonLinkClasses = "flex items-center space-x-3 py-2.5 px-4 rounded-lg transition-colors duration-150";

  // Inactive links: hover state is now lighter (neutral-700) on neutral-900 background
  const inactiveLinkClasses = "text-gray-300 hover:bg-neutral-700 hover:text-white";

  // Active Dashboard link: background is lighter (neutral-700)
  const activeLinkClassesDashboard = "bg-neutral-700 text-white font-semibold shadow-sm";

  // Other Active links: background is lighter (neutral-700)
  const activeLinkClassesOther = "bg-neutral-700 text-white font-medium";

  // Assuming header height is 4rem (h-16 or 64px)
  const calculatedHeight = "h-[calc(100vh-4rem)]";

  return (
    // MODIFIED: Main background changed from bg-black to bg-neutral-900
    <div
      className={`bg-neutral-900 text-white w-64 ${calculatedHeight} flex flex-col fixed left-0 top-16 shadow-lg z-10`}
    >
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${commonLinkClasses} ${
                isActive
                  ? item.to === '/'
                    ? activeLinkClassesDashboard
                    : activeLinkClassesOther
                  : inactiveLinkClasses
              }`
            }
            end={item.to === '/'}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* MODIFIED: Bottom section border color updated */}
      <div className="p-4 border-t border-neutral-700">
        <button
          // MODIFIED: Support button background and hover updated to neutral palette
          className={`${commonLinkClasses} w-full justify-start mb-2 text-gray-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white`}
          onClick={handleSupportClick}
        >
          <HelpCircle size={20} />
          <span>Support</span>
        </button>
        <button
          onClick={handleLogout}
          // Logout button uses inactiveLinkClasses for hover, which is now neutral-700
          className={`${commonLinkClasses} ${inactiveLinkClasses} w-full justify-start text-red-400 hover:bg-red-700 hover:text-white`}
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
        <div className="text-center text-xs text-gray-500 mt-6">
          © 2025 IDRS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SideNav;