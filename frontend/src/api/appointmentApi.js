import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/appointments';

// ඔක්කොම appointments fetch කරන function එක
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// එක appointment එකක් ගන්න ID එකෙන්
export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};