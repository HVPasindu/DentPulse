import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/appointments`;

export const getAllAppointments = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getAllAppointmentSummary = async () => {
  const response = await axios.get(`${BASE_URL}/status`);
  return response.data;
};
