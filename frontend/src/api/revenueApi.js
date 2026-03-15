import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/revenue`;

export const getWeeklyRevenue = async () => {
  const response = await axios.get(`${BASE_URL}/weekly`);
  return response.data; // IMPORTANT
};
