import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/appointments`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export const fetchAllAppointments = () => axios.get(BASE_URL, authHeader());

export const fetchAppointmentsByDate = (date) =>
  axios.get(`${BASE_URL}/by-date?date=${date}`, authHeader());


export const fetchAppointmentStats = () =>
  axios.get(`${BASE_URL}/stats`, authHeader());

export const fetchAppointmentById = (id) =>
  axios.get(`${BASE_URL}/${id}`, authHeader());

export const updateAppointmentStatus = (id, status) =>
  axios.put(`${BASE_URL}/${id}/status`, { status }, authHeader());

export const createAppointment = (payload) =>
  axios.post(BASE_URL, payload, authHeader());
