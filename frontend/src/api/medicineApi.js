import axios from "axios";

const BASE_URL = "http://localhost:8080/api/medicine";

export const getAllMedicines = async () => {
  const response = await axios.get(BASE_URL);
  return response.data; // IMPORTANT
};

export const getMedicinesByStatus = async (status) => {
  const response = await axios.get(`${BASE_URL}/status/${status}`);
  return response.data;
};

export const searchMedicines = async (keyword) => {
  const response = await axios.get(`${BASE_URL}/search?keyword=${keyword}`);
  return response.data;
};
