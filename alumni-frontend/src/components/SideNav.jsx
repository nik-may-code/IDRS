import React from "react";
import {
  User,
  Briefcase,
  Award,
  Calendar,
  LifeBuoy,
  Settings,
  LogOut,
  MessageCircle, // Discussion Form icon
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    navigate("/");
  };

  const navItems = [
    { name: "Profile", icon: <User className="w-5 h-5" />, path: "/dashboard" },
    { name: "Events", icon: <Calendar className="w-5 h-5" />, path: "/events" },
    {
      name: "Achievements",
      icon: <Award className="w-5 h-5" />,
      path: "/achievements",
    },
    {
      name: "Job Postings",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/jobs",
    },
    {
      name: "Discussion Page",
      icon: <MessageCircle className="w-5 h-5" />,
      path: "/discussionpage",
    },
  ];

  const bottomItems = [
    {
      name: "Help & Support",
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
  );
};

export default SideNav;
