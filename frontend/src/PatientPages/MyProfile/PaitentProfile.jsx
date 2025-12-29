import React from "react";
import PatientHeader from "../StaticPages/PatientHeader";
import { AppointmentDate } from "../BookAppointment/AppointmentDate";
import { PatientDetail } from "./PatientDetail";

import { PatientIdCard } from "./PatientIdCard";
import { NavigationButtons } from "../StaticPages/NavigationButtons";
const MainInterface = () => {
  return (
    <>
  
    
        <div className="bg-cyan-50">
     
          <PatientIdCard />

      </div>
    </>
  );
};

export default MainInterface;
