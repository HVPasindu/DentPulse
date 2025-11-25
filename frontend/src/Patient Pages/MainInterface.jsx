import React from "react";
import PatientHeader from "./PatientHeader";
import { AppointmentDate } from "./AppointmentDate";
import { PatientDetail } from "./PatientDetail";

const MainInterface = () => {
  return (
    <>
      <div>
        <PatientHeader />
      </div>
      <div className="flex flex-row justify-around pt-8">
        <PatientDetail />
        <AppointmentDate />
      </div>
      <div></div>
    </>
  );
};

export default MainInterface;
