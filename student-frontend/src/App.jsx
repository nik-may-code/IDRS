import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentPage";
import UploadDocument from "./pages/UploadDocument";
import Syllabus from "./pages/Syllabus";
import Notices from "./pages/Notices";
import CourseDetail from "./pages/CourseDetail";
import Support from "./pages/Support";
import Settings from "./pages/Settings.jsx"; // ✅ Update to .jsx
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ChangePassword from "./pages/ChangePassword";
import DiscussionPage from "./pages/DiscussionPage";
import DiscussionDetail from "./pages/DiscussionDetail";
import DiscussionForm from "./pages/DiscussionForm";
import Jobs from "./pages/Jobs";
import { AlertProvider } from "./components/AlertContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/syllabus",
    element: (
      <ProtectedRoute>
        <Syllabus />
      </ProtectedRoute>
    ),
  },
  {
    path: "/logs",
    element: (
      <ProtectedRoute>
        <DocumentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/upload-doc",
    element: (
      <ProtectedRoute>
        <UploadDocument />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notices",
    element: (
      <ProtectedRoute>
        <Notices />
      </ProtectedRoute>
    ),
  },
  {
    path: "/syllabus/:courseId",
    element: (
      <ProtectedRoute>
        <CourseDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/support",
    element: (
      <ProtectedRoute>
        <Support />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/discussionpage",
    element: (
      <ProtectedRoute>
        <DiscussionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/discussions/:id",
    element: (
      <ProtectedRoute>
        <DiscussionDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/discussionform",
    element: (
      <ProtectedRoute>
        <DiscussionForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

export default function App() {
  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}
