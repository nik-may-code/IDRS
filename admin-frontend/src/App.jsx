import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SideNav from "./Components/SideNav";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";

import Dashboard from "./Pages/Dashboard";
import FacultyManagement from "./Pages/FacultyManagement";
import StudentManagement from "./Pages/StudentManagement";
import AlumniManagement from "./Pages/AlumniManagement";
import Documents from "./Pages/Documents";
import UploadDocuments from "./Pages/UploadDocuments";
import SystemSettings from "./Pages/SystemSettings";
import UserManagement from "./Pages/UserManagement";
import ExportData from "./Pages/ExportData";
import SupportCenter from "./Pages/SupportCenter";
import AdminLogin from "./Pages/Login";
import Notices from "./Pages/Notices";

// Simple 404 Component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
  </div>
);

function AppContent() {
  const location = useLocation();
  const headerHeight = "h-16";

  // Check if current path is /login
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    // Only render the login page, no header or sidenav
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Render header, sidenav, and main content for all other routes
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className={`flex flex-1 pt-16`}>
        <SideNav headerHeight={headerHeight} />
        <main className="flex-1 ml-64 overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/faculty" element={<FacultyManagement />} />
              <Route path="/student" element={<StudentManagement />} />
              <Route path="/alumni" element={<AlumniManagement />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/upload" element={<UploadDocuments />} />
              <Route path="/system-settings" element={<SystemSettings />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/export-data" element={<ExportData />} />
              <Route path="/support" element={<SupportCenter />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;