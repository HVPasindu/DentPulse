/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/appointments';

// ඔක්කොම appointments fetch කරන function එක
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// එක appointment එකක් ගන්න ID එකෙන්
export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

// ===============================
// ✅ ADMIN DASHBOARD – TODAY'S APPOINTMENTS
// ===============================
export const getTodayAppointments = async () => {
  try {
    const response = await axios.get("/today");
    return response.data;
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
    throw error;
  }
}; 
*/


import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/appointments";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// GET ALL APPOINTMENTS
// ===============================
export const getAllAppointments = async () => {
  const response = await api.get("/");
  return response.data;
};

// ===============================
// GET APPOINTMENT BY ID
// ===============================
export const getAppointmentById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// ===============================
// ✅ ADMIN DASHBOARD – TODAY'S APPOINTMENTS
// ===============================
export const getTodayAppointments = async () => {
  const response = await api.get("/today");
  return response.data;
};
