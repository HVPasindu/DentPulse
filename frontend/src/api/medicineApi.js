import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/medicine`;

export const getAllMedicines = async () => {
  const response = await axios.get(BASE_URL);
  return response.data; // IMPORTANT
};

export const getMedicinesByStatus = async (status) => {
  const response = await axios.get(`${BASE_URL}/status/${status}`);
  return response.data;
};

export const searchMedicines = async (keyword) => {
  const response = await axios.get(`${BASE_URL}/search?keyword=${keyword}`);
  return response.data;
};

// 🔹 Medicines for prescription dropdown (AVAILABLE + LIMITED)
export const getAvailableMedicinesForPrescription = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/medicine/available`
  );
  return response.data;
};
const PRESCRIPTION_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/prescriptions`;
export const getTodayPrescriptionCount = async () => {
  const response = await axios.get(`${PRESCRIPTION_BASE_URL}/today-count`);
  return response.data;
};

// ✅ ADD THESE (for print count)
export const printPrescription = async () => {
  const response = await axios.post(`${PRESCRIPTION_BASE_URL}/print`);
  return response.data; // updated count
};
