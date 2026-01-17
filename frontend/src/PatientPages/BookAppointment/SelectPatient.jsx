// 

import React from "react";
import { UserPlus } from "lucide-react";
export const SelectPatient = ({ FamilyDetail, handleChange, selectedPatient }) => {
  return (
    <div className="pl-10">
      <div className="rounded-2xl bg-white border border-green-300 shadow-lg h-full p-4">
        <div className="p-4">
          <div className="flex flex-row items-baseline gap-x-2">
            <div>
              <UserPlus />
            </div>
              <div>
         <h1 className="text-green-700 text-4xl font-serif font-stretch-105%">
            Select Patient
            <br />
  
          </h1>
                    <h1 className="text-green-500 text-2xl font-normal">
              Choose who this appointment is for
            </h1>
              </div>
          </div>
 
        </div>
        <div className="p-4">
          <h1 className="text-xl text-green-700 mb-2">Patient</h1>
          <select
            name="patient"
            id="patient-select"
            className="border-2 border-green-500 rounded-lg w-full p-2"
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
          <div className="p-4 mt-2 bg-green-50 rounded-lg">
            <p className="text-lg text-gray-600">Selected:</p>
            <p className="text-xl font-semibold text-green-700">
              {selectedPatient.fullName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
