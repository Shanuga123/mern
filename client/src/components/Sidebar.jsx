import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dashboard, Hotel, Help, Settings, ExitToApp, BookOnline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/state";

const Sidebar = ({ isCollapsed }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const sidebarItems = [
    { path: "/dashboard", title: "Dashboard", icon: <Dashboard /> },
    { path: "/my-hotels", title: "My Hotels", icon: <Hotel /> },
    { path: "/book-hotels", title: "Booked Hotels", icon: <BookOnline /> },
    { path: "/help", title: "Help", icon: <Help /> },
    { path: "/settings", title: "Settings", icon: <Settings /> },
    {
      title: "Logout",
      path: "/",
      icon: <ExitToApp />,
      action: () => dispatch(setLogout()),
    },
  ];

  return (
    <div className={`h-full bg-blue-800 text-white flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      <h1 className={`text-2xl font-bold p-4 ${isCollapsed ? "hidden" : ""}`}>Menu</h1>
      <ul className="flex-1 mt-6">
        {sidebarItems.map(({ path, title, icon, action }) => (
          <li key={title} className="mb-2">
            {path ? (
              <NavLink
                to={path}
                className={`flex items-center p-4 hover:bg-blue-700 transition-colors duration-200 ${location.pathname === path ? "bg-blue-700" : ""}`}
                exact
              >
                {icon}
                {!isCollapsed && <span className="ml-2">{title}</span>}
              </NavLink>
            ) : (
              <button
                onClick={action}
                className="w-full flex items-center p-4 hover:bg-blue-700 transition-colors duration-200"
              >
                {icon}
                {!isCollapsed && <span className="ml-2">{title}</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
