import React from "react";
import PatientHeader from "../PatientPages/StaticPages/PatientHeader";
import { Outlet } from "react-router-dom";
import { NavigationButtons } from "../PatientPages/StaticPages/NavigationButtons";
import { Patientsidebar } from "../PatientPages/StaticPages/Patientsidebar";
export const PatientLayout = () => {
  return (
       <div className="relative min-h-screen flex">
      
    
      <div className="relative z-20">
        <Patientsidebar />
      </div>

     
      <div
        className="flex-1 ml-80 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/background2.png')" }}
      >
     
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

   
        <div className="relative z-10 p-6 md:p-8 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
