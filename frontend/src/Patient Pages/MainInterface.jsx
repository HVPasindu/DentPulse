import React from "react";
import PatientHeader from "./PatientHeader";
import { AppointmentDate } from "./AppointmentDate";

const MainInterface = () => {
  return (
    <>
          <div>
      <PatientHeader />
   
    </div>
    <div>
      
      <AppointmentDate/>

    </div>
    
    
    </>

  );
};

export default MainInterface;
