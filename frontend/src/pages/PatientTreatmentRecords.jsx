// src/pages/TreatmentRecords.jsx
import React, { useEffect, useState } from "react";
import { getAllTreatmentRecords } from "../api/treatmentApi";
import TreatmentChart from "../components/TreatmentChart";
import { getTreatmentCharts } from "../api/treatmentApi";

const TreatmentRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
 // const [chartData, setChartData] = useState({});

  useEffect(() => {
    getAllTreatmentRecords().then(data => setRecords(data));
  //  getTreatmentCharts().then(data => setChartData(data));
  }, []);

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.treatment_id.toString().includes(searchTerm) ||
      r.patient_id.toString().includes(searchTerm);
    
    const recordDate = new Date(r.treatment_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const matchesDateRange = 
      (!start || recordDate >= start) &&
      (!end || recordDate <= end);
    
    return matchesSearch && matchesDateRange;
  });

        // Calculate chart data from filtered records
      const calculateChartData = () => {
        const stats = {};
        
        filteredRecords.forEach(record => {
          const treatmentType = record.treatmentType;
          stats[treatmentType] = (stats[treatmentType] || 0) + 1;
        });
        
        return stats;
      };

      const chartData = calculateChartData();

// ...existing code...
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-green-600">Treatment Records</h1>
 
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by ID or Patient ID"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 border-green-500"
        />
        
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-md border-green-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-md border-green-500"
            />
          </div>
          
          <button
            onClick={() => {
              setStartDate("");
              setEndDate(new Date().toISOString().split('T')[0]);
            }}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-center">Treatment ID</th>
              <th className="px-4 py-3 text-center">Patient ID</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Diagnosis</th>
              <th className="px-4 py-3 text-center">Treatment Type</th>
              <th className="px-4 py-3 text-center">Dentist Note</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <tr key={record.treatment_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">{record.treatment_id}</td>
                  <td className="px-4 py-3 text-center">{record.patient_id}</td>
                  <td className="px-4 py-3 text-center">{new Date(record.treatment_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">{record.diagnosis}</td>
                
                  <td className="px-4 py-3 text-center">
                    {record.treatmentType}
                  </td>

                  <td className="px-4 py-3 text-center">{record.dentist_note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

          {/* ADD THIS SECTION */}
    {/* {Object.keys(chartData).length > 0 && (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <TreatmentChart data={chartData} />
      </div>
    )} */}


    {/* ENHANCED CHART AT THE BOTTOM */}
{Object.keys(chartData).length > 0 ?  (
  <div className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-2xl p-8 mt-8 border-2 border-green-500">
    <TreatmentChart data={chartData} />
    
    {/* Summary Stats Below Chart */}
    <div className="mt-6 pt-6 border-t-2 border-green-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md text-center border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-semibold">Total Treatments</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {filteredRecords.length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md text-center border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-semibold">Treatment Types</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {Object. keys(chartData).length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md text-center border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-semibold">Most Common</p>
          <p className="text-lg font-bold text-green-600 mt-1">
            {Object.keys(chartData).length > 0 
              ? Object.entries(chartData).reduce((a, b) => a[1] > b[1] ? a : b)[0]
              : 'N/A'
            }
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md text-center border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-semibold">Avg per Type</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {(filteredRecords.length / Object.keys(chartData).length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  </div>
) : (
  <div className="bg-white shadow-lg rounded-2xl p-8 mt-8 text-center border-2 border-gray-200">
    <p className="text-gray-500 text-lg">📊 No treatment data available for the selected period</p>
  </div>
)}
    </div>
  );
};

export default TreatmentRecords;