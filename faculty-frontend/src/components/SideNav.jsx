import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiBell,
  FiSettings,
  FiHelpCircle,
} from 'react-icons/fi';

const SideNav = () => {
  const topNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome className="text-lg" /> },
    { path: '/documents', label: 'Documents', icon: <FiFileText className="text-lg" /> },
    { path: '/leaves', label: 'Leaves', icon: <FiCalendar className="text-lg" /> },
    { path: '/notices', label: 'Notices', icon: <FiBell className="text-lg" /> },
  ];

  const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: <FiSettings className="text-lg" /> },
    { path: '/support', label: 'Support', icon: <FiHelpCircle className="text-lg" /> },
  ];

  return (
    <nav className="fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-black text-white border-r border-gray-800 flex flex-col justify-between">
      <ul className="p-4 flex flex-col gap-2">
        {topNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${
                  isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="p-4 flex flex-col gap-2">
        {bottomNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${
                  isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;

