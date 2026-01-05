import React from "react";
import PatientHeader from "../PatientPages/StaticPages/PatientHeader";
import { Outlet } from "react-router-dom";
import  {NavigationButtons}  from "../PatientPages/StaticPages/NavigationButtons";
export const PatientLayout = () => {
  return (
    <div>
      <PatientHeader />
      <NavigationButtons />
      <Outlet />
    </div>
  );
};
