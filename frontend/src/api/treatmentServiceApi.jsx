import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/treatment-services",
});

export const fetchTreatmentServices = async () => {
  const res = await api.get("");
  return res.data;
};