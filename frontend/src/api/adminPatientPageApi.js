// adminPatientPageApi.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// GET ALL PATIENTS (ADMIN)
export const getAllPatients = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/list`,   // ⭐ IMPORTANT
      authHeader()
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching patients:", err);
    throw err;
  }
};

// ADD PATIENT (ADMIN)  🔥 THIS WAS MISSING
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}`,
      patientData,
      authHeader()
    );
    return response.data;
  } catch (err) {
    console.error("Error adding patient:", err);
    throw err;
  }
}

export const getPatientById = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient/admin/${id}`,
    authHeader()
  );
  return res.data;
};

export const getPatientHistory = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient/admin/${id}/history`,
    authHeader()
  );
  return res.data;
};
