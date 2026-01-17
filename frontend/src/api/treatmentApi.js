// src/api/treatmentApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/records";

export const getAllTreatmentRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data; // List of TreatmentRecordDTO
  } catch (error) {
    console.error("Error fetching all treatment records:", error);
    return [];
  }
};

export const getTreatmentRecordsByPatient = async (patientId) => {
  try {
    const response = await axios.get(`${BASE_URL}/patient/${patientId}/all`);
    return response.data; // List of TreatmentRecordDTO for the patient
  } catch (error) {
    console.error(`Error fetching treatment records for patient ${patientId}:`, error);
    return [];
  }
};

export const getTreatmentCharts = async () => {
  const response = await axios.get(`${BASE_URL}/treatment-stats`);
  return response.data;
};
