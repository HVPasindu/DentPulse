import axios from "axios";


const BASE_URL = "http://localhost:8080/api/appointments";

export const getAllAppointments = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getAllAppointmentSummary = async () => {
  const response = await axios.get(`${BASE_URL}/status`);
  return response.data;
};
