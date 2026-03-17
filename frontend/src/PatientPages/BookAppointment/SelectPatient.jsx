// 

import React from "react";
import { UserPlus } from "lucide-react";
export const SelectPatient = ({ FamilyDetail, handleChange, selectedPatient }) => {
  return (
    <div className="">
      <div className="rounded-2xl bg-white border border-green-300 shadow-lg h-full p-4">
        <div className="p-4">
         <div className="flex items-start gap-2">
            <div>
              <UserPlus />
            </div>
              <div>
         <h1 className="text-green-700 text-lg ">
            Select Patient
            <br />
  
          </h1>
                    <h1 className="text-green-500 text-md font-normal">
              Choose who this appointment is for
            </h1>
              </div>
          </div>
 
        </div>
        <div className="p-3">
          <h1 className="text-md text-green-700 mb-2">Patient</h1>
          <select
            name="patient"
            id="patient-select"
            className="border-2 border-green-500 rounded-lg w-full p-1"
            onChange={handleChange}
            value={selectedPatient?.patientId || ""}
          >
            <option value="">-- Select a patient --</option>
            {FamilyDetail.map((patient) => (
              <option key={patient.patientId} value={patient.patientId}>
                {patient.fullName}
              </option>
            ))}
          </select>
        </div>
        {selectedPatient && (
         <div className="p-3 mt-2 bg-green-50 rounded-lg w-full overflow-hidden">
            <p className="text-xs text-gray-600">Selected:</p>
            <p className="text-sm font-semibold text-green-700 break-words">
              {selectedPatient.fullName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
