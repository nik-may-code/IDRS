
import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet,useLocation } from 'react-router-dom';
import SideNav from './components/SideNav';
import Header from './components/Header';
import AddNotice from './pages/AddNotice';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Leaves from './pages/Leaves';
import Login from './pages/Login';
import Notices from './pages/Notices';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Support from './pages/SupportCenter';
import UploadDocuments from './pages/UploadDocuments';
const AppLayout = ({ unreadCount }) => {
  const location = useLocation();
  const showLayout = location.pathname !== '/login';
  return showLayout ? (
    <>
      <Header unreadCount={unreadCount} />
      <SideNav />
      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    <Outlet />
  );
};

function App() {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <AuthProvider>
      <div className="min-h-screen bg-unified-main-bg">
      <div className="hidden">
          <Notification onUnreadCountChange={setUnreadCount} />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout unreadCount={unreadCount} />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/upload" element={<UploadDocuments />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/notices/add" element={<AddNotice />} />
              <Route path="/notifications" element={<Notification onUnreadCountChange={setUnreadCount} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
export default App;