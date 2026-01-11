// 

import React from "react";

export const SelectPatient = ({ FamilyDetail, handleChange, selectedPatient }) => {
  return (
    <div className="pl-10">
      <div className="rounded-2xl bg-white border border-cyan-300 shadow-lg h-full p-4">
        <div className="p-4">
          <h1 className="text-cyan-700 text-lg">
            Select Patient
            <br />
            <span className="text-cyan-300 text-sm font-normal">
              Choose who this appointment is for
            </span>
          </h1>
        </div>
        <div className="p-4">
          <h1 className="text-sm text-cyan-600 mb-2">Patient</h1>
          <select
            name="patient"
            id="patient-select"
            className="border-2 border-cyan-500 rounded-lg w-full p-2"
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
          <div className="p-4 mt-2 bg-cyan-50 rounded-lg">
            <p className="text-sm text-gray-600">Selected:</p>
            <p className="text-lg font-semibold text-cyan-700">
              {selectedPatient.fullName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
