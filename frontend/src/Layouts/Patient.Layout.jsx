import React from "react";
import PatientHeader from "../PatientPages/StaticPages/PatientHeader";
import { Outlet } from "react-router-dom";
import { NavigationButtons } from "../PatientPages/StaticPages/NavigationButtons";
import { Patientsidebar } from "../PatientPages/StaticPages/Patientsidebar";
export const PatientLayout = () => {
  return (
  <div className="min-h-screen">

      {/* Sidebar */}
      <Patientsidebar />

      {/* Main Content */}
      <div
        className="ml-60 min-h-screen relative bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

        {/* Page content */}
        <div className="relative z-10 p-6 md:p-8">
          <Outlet />
        </div>

      </div>
    </div>
  );
};
