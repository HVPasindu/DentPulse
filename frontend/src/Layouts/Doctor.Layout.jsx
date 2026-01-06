import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
export const DoctorLayout = () => {
  return (
    <div>
      <div className="bg-blue-50 min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="ml-64 flex-1 p-6 md:p-0">
         <Outlet/>
        </div>
      </div>
    </div>
  );
};
