import axios from "axios";

const BASE_URL = "http://localhost:8080/api/records/patient";

/**
 * Get patient by ID
 * @param {number} patientId - The ID of the patient
 * @returns {Promise<Object>} - Patient data object
 * @throws {Error} - If the API call fails
 */
export const getPatientById = async (patientId) => {
  try {
    // Validate patient ID
    if (! patientId) {
      throw new Error("Patient ID is required");
    }

    // Use backticks for template literal
    const response = await axios. get(`${BASE_URL}/${patientId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching patient:", err);
    
    // Provide detailed error message
    const errorMessage =
      err.response?.data?. message ||
      err.message ||
      "Failed to fetch patient information";
    
    throw new Error(errorMessage);
  }
};

/**
 * Get all patients
 * @returns {Promise<Array>} - Array of patient objects
 */
export const getAllPatients = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching all patients:", err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch patients"
    );
  }
};

/**
 * Create a new patient
 * @param {Object} patientData - Patient data
 * @returns {Promise<Object>} - Created patient
 */
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(BASE_URL, patientData);
    return response.data;
  } catch (err) {
    console.error("Error creating patient:", err);
    throw new Error(
      err.response?.data?. message || "Failed to create patient"
    );
  }
};

/**
 * Update patient information
 * @param {number} patientId - Patient ID
 * @param {Object} patientData - Updated data
 * @returns {Promise<Object>} - Updated patient
 */
export const updatePatient = async (patientId, patientData) => {
  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const response = await axios.put(`${BASE_URL}/${patientId}`, patientData);
    return response.data;
  } catch (err) {
    console.error("Error updating patient:", err);
    throw new Error(
      err.response?.data?.message || "Failed to update patient"
    );
  }
};

/**
 * Delete a patient
 * @param {number} patientId - Patient ID
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deletePatient = async (patientId) => {
  try {
    if (! patientId) {
      throw new Error("Patient ID is required");
    }

    const response = await axios.delete(`${BASE_URL}/${patientId}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting patient:", err);
    throw new Error(
      err.response?. data?.message || "Failed to delete patient"
    );
  }
};