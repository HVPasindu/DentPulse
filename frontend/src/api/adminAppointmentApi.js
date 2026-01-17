import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin/appointments";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export const fetchAllAppointments = () =>
  axios.get(BASE_URL, authHeader());

export const fetchAppointmentsByDate = (date) =>
  axios.get(`${BASE_URL}/by-date?date=${date}`, authHeader());

export const fetchAppointmentStats = () =>
  axios.get(`${BASE_URL}/stats`, authHeader());