import React from "react";
import { useAlert } from "./AlertContext";
import {
  Home,
  BookOpen,
  FolderOpen,
  Bell,
  LifeBuoy,
  Settings,
  LogOut,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    try {
      localStorage.removeItem("student_token"); // Clear token
      localStorage.removeItem("student_user");
      localStorage.removeItem("student_email"); // Clear user info
      showAlert("Logged out successfully", "success");
      navigate("/"); // Redirect to login
    } catch (err) {
      showAlert("Logout failed. Please try again.", "error");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Syllabus & Units",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/syllabus",
    },
    {
      name: "Logs&Reports",
      icon: <FolderOpen className="w-5 h-5" />,
      path: "/logs",
    },
    { name: "Notices", icon: <Bell className="w-5 h-5" />, path: "/notices" },
    {
      name: "Discussions",
      icon: <MessageCircle className="w-5 h-5" />,
      path: "/discussionpage",
    },
    {
      name: "Job Opportunities",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/jobs",
    },
  ];

  const bottomItems = [
    {
      name: "Help and Support",
      icon: <LifeBuoy className="w-5 h-5" />,
      path: "/support",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <>
      <div className="w-64 h-screen fixed bg-zinc-900 text-white flex flex-col justify-between p-4">
        {/* Top Nav */}
        <div>
          <nav className="flex flex-col gap-2">
            {navItems.map(({ name, icon, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                {icon}
                {name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Nav */}
        <div className="flex flex-col mb-14 gap-2">
          {bottomItems.map(({ name, icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              {icon}
              {name}
            </NavLink>
          ))}

          {/* 🚪 Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-zinc-800 hover:text-red-500 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNav;
