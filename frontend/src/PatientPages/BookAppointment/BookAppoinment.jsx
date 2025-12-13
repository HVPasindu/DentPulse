import React from "react";
import { AppointmentDate } from "./AppointmentDate";
import { RecentAppoinment } from "./RecentAppoinment";
import { SelectPatient } from "./SelectPatient";
import { TimeSlot } from "./TimeSlot";
export const BookAppoinment = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly gap-7">
          <SelectPatient />
          <AppointmentDate />
        </div>
        <div className="gap-6">
          <TimeSlot />
        </div>
      </div>
    </div>
  );
};
