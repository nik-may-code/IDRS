import React from 'react';
import { Link } from 'react-router-dom';
import { FiCircle, FiUser, FiBell } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";
const Header = ({ unreadCount }) => {
const { user } = useAuth(); 

  return (
    <header className="fixed top-0 left-0 right-0 h-header-height bg-unified-dark-bg flex items-center justify-between px-6 z-50">
      <Link to="/dashboard" className="flex items-center gap-2" aria-label="Go to Dashboard">
        <div className="bg-unified-dark-pill flex items-center gap-2 p-1.5 rounded-lg">
          <div className="bg-white p-1 rounded-md">
            <FiCircle className="text-text-dark text-lg" aria-hidden="true" />
          </div>
          <h1 className="text-lg font-semibold text-text-light pr-2">
            IDRS
          </h1>
        </div>
        <div className="bg-unified-dark-pill text-sidebar-muted-text text-sm font-medium px-4 py-2.5 rounded-lg hidden sm:block">
          Institute Data Retrieval System
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/notifications"
          aria-label="View notifications"
          className="text-sidebar-muted-text hover:text-text-light p-2 rounded-full hover:bg-unified-dark-pill transition-colors relative"
        >
          <FiBell size={22} />
          {unreadCount > 0 && (
            <span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0" />
          )}
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-1 rounded-lg hover:bg-unified-dark-pill transition-colors"
          aria-label="View profile"
        >
          <div className="w-9 h-9 rounded-full bg-unified-dark-pill flex items-center justify-center">
            <FiUser className="text-text-light" aria-hidden="true" />
          </div>
          <span className="text-text-light font-medium text-sm">
          {user?.name || "Dr.Sofia"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;