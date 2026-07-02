import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import DiscussionForm from "./pages/DiscussionForm";
import DiscussionPage from "./pages/DiscussionPage";
import DiscussionDetail from "./pages/DiscussionDetail";
import Events from "./pages/Events";
import Achievements from "./pages/Achievements";
import Jobs from "./pages/Jobs";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Documents from "./pages/Documents";
import ProtectedRoute from "./components/ProtectedRoute";

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/achievements",
        element: <Achievements />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/discussionpage",
        element: <DiscussionPage />,
      },
      {
        path: "/discussionform",
        element: <DiscussionForm />,
      },
      {
        path: "/discussions/:id",
        element: <DiscussionDetail />,
      },
      {
        path: "/documents",
        element: <Documents />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
