import axios from "axios";

// Replace with your Spring Boot backend URL
const BASE_URL = "http://localhost:8080/api/records";

/**
 * Save or update a treatment record
 * @param {Object} recordData - { treatment_id, patient_id, treatment_date, diagnosis, dentist_note }
 * @returns {Promise<Object>} - saved record
 */
export const saveTreatmentRecord = async (recordData) => {
  try {
    const response = await axios.post(BASE_URL, recordData);
    return response.data;
  } catch (err) {
    console.error("Error saving treatment record:", err);
    throw err;
  }
};
