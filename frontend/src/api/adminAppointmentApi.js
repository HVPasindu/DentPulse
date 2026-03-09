import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/admin/appointments";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

/*
====================================================
OLD FUNCTIONS (KEPT – DO NOT DELETE)
====================================================
*/
export const fetchAllAppointments = () => axios.get(BASE_URL, authHeader());

export const fetchAppointmentsByDate = (date) =>
  axios.get(`${BASE_URL}/by-date?date=${date}`, authHeader());

/*
====================================================
NEW: Fetch appointment summary stats
Endpoint: GET /api/v1/admin/appointments/stats
====================================================
*/
export const fetchAppointmentStats = () =>
  axios.get(`${BASE_URL}/stats`, authHeader());

export const fetchAppointmentById = (id) =>
  axios.get(`${BASE_URL}/${id}`, authHeader());

export const updateAppointmentStatus = (id, status) =>
  axios.put(`${BASE_URL}/${id}/status`, { status }, authHeader());

export const createAppointment = (payload) =>
  axios.post(BASE_URL, payload, authHeader());
