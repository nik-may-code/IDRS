import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // user avatar icon
import { HiOutlineCamera } from 'react-icons/hi'; // logo icon

function Header() {

  const loggedInUser = localStorage.getItem('alumni_user'); // Fallback to 'Guest' if no user info
  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-zinc-900 text-white shadow-sm z-50 flex items-center justify-between px-8">
      {/* Logo or Title */}
      <div className="text-lg font-semibold flex items-center space-x-2">
        <span>IDRS</span>
      </div>


      {/* User Info */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-3xl" />
        <span className="text-sm font-medium">{loggedInUser}</span>
      </div>
    </header>
  );
}

export default Header;