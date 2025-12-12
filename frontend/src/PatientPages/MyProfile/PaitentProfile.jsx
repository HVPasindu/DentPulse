import React from "react";
import PatientHeader from "../StaticPages/PatientHeader";
import { AppointmentDate } from "../AppointmentDate";
import { PatientDetail } from "./PatientDetail";
import { RecentAppoinment } from "../RecentAppoinment";
import { PatientIdCard } from "./PatientIdCard";
import { NavigationButtons } from "../StaticPages/NavigationButtons";
const MainInterface = () => {
  return (
    <>
  
    
        <div className="">
     
          <PatientIdCard />

      </div>
    </>
  );
};

export default MainInterface;
