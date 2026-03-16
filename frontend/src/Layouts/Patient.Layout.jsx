import React  from "react";
import PatientHeader from "../PatientPages/StaticPages/PatientHeader";
import { Outlet } from "react-router-dom";
import { NavigationButtons } from "../PatientPages/StaticPages/NavigationButtons";
import { Patientsidebar } from "../PatientPages/StaticPages/Patientsidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
export const PatientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Sidebar */}


      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Patientsidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div
         className="lg:ml-60 min-h-screen relative bg-cover bg-center"
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
