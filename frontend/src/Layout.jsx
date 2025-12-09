import { Outlet } from "react-router-dom";
import React from "react";
import PatientHeader from "./Patient Pages/PatientHeader";
import { NavigationButtons}  from "./Patient Pages/NavigationButtons";

const Layout = () => {
  return (
    <div>
        <PatientHeader/>
        <NavigationButtons/>
      <Outlet />


    </div>
  );
};
export default Layout;