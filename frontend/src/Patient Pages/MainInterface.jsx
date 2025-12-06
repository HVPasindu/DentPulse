import React from "react";
import PatientHeader from "./PatientHeader";
import { AppointmentDate } from "./AppointmentDate";
import { PatientDetail } from "./PatientDetail";
import { RecentAppoinment } from "./RecentAppoinment";
import { PatientIdCard } from "./PatientIdCard";

const MainInterface = () => {
  return (
    <>
      <div className="bg-cyan-50">
        <div>
          <PatientHeader />
        </div>

        <div>
          <PatientIdCard />
        </div>

        <div className="flex  justify-around pt-8">
          <PatientDetail />
          <AppointmentDate />
        </div>
        <div className="pt-5">
          <RecentAppoinment />
        </div>
      </div>
    </>
  );
};

export default MainInterface;
