import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin`;

export const getAdminDashboardSummary = async (token) => {
  const response = await axios.get(`${BASE_URL}/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};