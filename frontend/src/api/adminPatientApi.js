import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/patient/admin";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// 🔹 Get patient by ID (Admin)
export const fetchPatientById = (id) =>
  axios.get(`${BASE_URL}/${id}`, authHeader());
