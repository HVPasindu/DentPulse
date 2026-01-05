// src/pages/TreatmentRecords.jsx
import React, { useEffect, useState } from "react";
import { getAllTreatmentRecords } from "../api/treatmentApi";

const TreatmentRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTreatmentRecords().then(data => setRecords(data));
  }, []);

  const filteredRecords = records.filter(
    r =>
      r.treatment_id.toString().includes(searchTerm) ||
      r.patient_id.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Treatment Records</h1>

      <input
        type="text"
        placeholder="Search by ID or Patient ID"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md w-full md:w-1/3"
      />

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Treatment ID</th>
              <th className="px-4 py-3">Patient ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Diagnosis</th>
              <th className="px-4 py-3">Dentist Note</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <tr key={record.treatment_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{record.treatment_id}</td>
                  <td className="px-4 py-3">{record.patient_id}</td>
                  <td className="px-4 py-3">{new Date(record.treatment_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{record.diagnosis}</td>
                  <td className="px-4 py-3">{record.dentist_note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No records found
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
