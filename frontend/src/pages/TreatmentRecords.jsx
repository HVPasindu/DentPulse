// src/pages/TreatmentRecords.jsx
import React, { useState } from "react";
import { dummyTreatmentRecords } from "../data/treatmentData";

const TreatmentRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter records by Treatment ID or Patient Name
  const filteredRecords = dummyTreatmentRecords.filter(
    (record) =>
      record.treatment_id.toString().includes(searchTerm) ||
      record.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-cyan-600 mb-2">
        Treatment Records
      </h1>
      <p className="text-gray-900 mb-6">
        View past treatment history of patients
      </p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Treatment ID or Patient Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/3 mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-cyan-500 focus:ring-cyan-500"
      />

      {/* Table */}
      <div className="bg-cyan shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cyan-500 text-black">
            <tr>
              <th className="px-4 py-3 text-left">Treatment ID</th>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Diagnosis</th>
              <th className="px-4 py-3 text-left">Dentist Note</th>
              <th className="px-4 py-3 text-left">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.treatment_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{record.treatment_id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{record.patient.name}</div>
                    <div className="text-xs text-gray-500">
                      ID: {record.patient.patient_id}
                    </div>
                  </td>
                  <td className="px-4 py-3">{record.treatment_date}</td>
                  <td className="px-4 py-3">{record.diagnosis}</td>
                  <td className="px-4 py-3">{record.dentist_note}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.attachment
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {record.attachment ? "Available" : "Not Available"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No treatment records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreatmentRecords;
