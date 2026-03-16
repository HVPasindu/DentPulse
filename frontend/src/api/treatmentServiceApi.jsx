import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/treatment-services`,
});

export const fetchTreatmentServices = async () => {
  const res = await api.get("");
  return res.data;
};