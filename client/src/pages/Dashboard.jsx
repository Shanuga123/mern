import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="mt-4">Welcome to your dashboard.</p>
          {/* Add your dashboard content here */}
        </main>
      </div>
    </div>
  );
};


