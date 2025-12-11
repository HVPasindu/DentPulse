import { Outlet } from "react-router-dom";
import React from "react";
import PatientHeader from "./PatientPages/StaticPages/PatientHeader";
import { NavigationButtons } from "./PatientPages/StaticPages/NavigationButtons";

const Layout = () => {
  return (
    <div>
      <PatientHeader />
      <NavigationButtons />
      <Outlet />
    </div>
  );
};
export default Layout;
