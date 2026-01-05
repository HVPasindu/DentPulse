import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Admin/DashboardSidebar";
export const AdminLayout = () => {
  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar - Added h-full to ensure it stretches the full length */}
        <div className="w-64 bg-gray-100 h-full">
          <DashboardSidebar />
        </div>
        {/* Page Content */}
        
             <div className="flex-1 overflow-auto">
         <Outlet/>
         
        </div>
      </div>
    </div>
  );
};
