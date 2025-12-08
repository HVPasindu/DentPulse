import React from "react";
import PatientHeader from "./PatientHeader";
import { AppointmentDate } from "./AppointmentDate";
import { PatientDetail } from "./PatientDetail";
import { RecentAppoinment } from "./RecentAppoinment";
import { PatientIdCard } from "./PatientIdCard";
import { NavigationButtons } from "./NavigationButtons";
const MainInterface = () => {
  return (
    <>
      <div className="bg-cyan-50">
        <div>
          <PatientHeader />
        </div>
        <div>
          <NavigationButtons />
        </div>


        <div className="">
     
          <PatientIdCard />
        </div>
      </div>
    </>
  );
};

export default MainInterface;
