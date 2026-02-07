import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/admin";

/**
 * NEW: Admin dashboard summary API
 * Reason: Dashboard data is NOT appointment-specific
 */
export const getAdminDashboardSummary = async (token) => {
  const response = await axios.get(`${BASE_URL}/dashboard/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};