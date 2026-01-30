import axios from "axios";

const BASE_URL = "http://localhost:8080/api/revenue";

export const getWeeklyRevenue = async () => {
  const response = await axios.get(`${BASE_URL}/weekly`);
  return response.data; // IMPORTANT
};
