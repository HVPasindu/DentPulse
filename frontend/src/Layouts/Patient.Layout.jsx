import React from "react";
import PatientHeader from "../PatientPages/StaticPages/PatientHeader";
import { Outlet } from "react-router-dom";
import  {NavigationButtons}  from "../PatientPages/StaticPages/NavigationButtons";
import { Patientsidebar } from "../PatientPages/StaticPages/Patientsidebar";
export const PatientLayout = () => {
  return (
    <div>
      <div className=" min-h-screen flex">
        {/* Sidebar */}
        <Patientsidebar />

        {/* Page Content */}
        <div className="ml-80 flex-1 p-6 md:p-8">
         <Outlet/>
        </div>
      </div>
    </div>
  );
};
