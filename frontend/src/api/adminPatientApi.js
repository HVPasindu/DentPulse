import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient/admin`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// 🔹 Get patient by ID (Admin)
export const fetchPatientById = (id) =>
  axios.get(`${BASE_URL}/${id}`, authHeader());
