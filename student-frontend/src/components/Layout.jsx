import React from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom'; // or replace with your actual content

const Layout = ({children}) => {
  return (
    <div className="relative min-h-screen bg-zinc-100">
      <Header />
      <SideNav />

      {/* Main Content Area */}
      <main className="ml-64 mt-14 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
