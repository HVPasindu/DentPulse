import axios from "axios";

// REMOVED the trailing slash at the end of the URL
const BASE_URL = "http://localhost:8080/api/v1/admin/inventory"; 

const authHeader = () => {
  // Confirmed: your key is "authToken"
  const token = localStorage.getItem("authToken"); 
  return {
    headers: {
      // Ensure there is a space after 'Bearer'
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const fetchAllInventory = () => axios.get(BASE_URL, authHeader());
export const createInventoryItem = (payload) => axios.post(BASE_URL, payload, authHeader());
export const updateInventoryItem = (id, payload) => axios.put(`${BASE_URL}/${id}`, payload, authHeader());
export const deleteInventoryItem = (id) => axios.delete(`${BASE_URL}/${id}`, authHeader());

// Backend-specific endpoints for Search and Dashboard Stats
export const fetchInventoryStats = () => axios.get(`${BASE_URL}/stats`, authHeader());
export const searchInventoryItems = (query) => axios.get(`${BASE_URL}/search?query=${query}`, authHeader());