import axios from "axios";

// Base URL for treatment records API endpoint
const BASE_URL = "http://localhost:8080/api/records";

/**
 * Save or update a treatment record
 * @param {Object} recordData - Treatment record data
 * @param {number} recordData.patient_id - ID of the patient
 * @param {string} recordData.treatment_date - Date of treatment (YYYY-MM-DD)
 * @param {string} recordData.diagnosis - Diagnosis description
 * @param {string} recordData.dentist_note - Notes from dentist
 * @returns {Promise<Object>} - The saved record from backend
 * @throws {Error} - If the API call fails
 */
export const saveTreatmentRecord = async (recordData) => {
  try {
    // Validate required fields
    if (!recordData.patient_id) {
      throw new Error("Patient ID is required");
    }
    if (!recordData.treatment_date) {
      throw new Error("Treatment date is required");
    }

    const response = await axios.post(BASE_URL, recordData);
    return response.data;
  } catch (err) {
    console.error("Error saving treatment record:", err);
    
    // Provide user-friendly error message
    const errorMessage =
      err.response?.data?. message ||
      err.message ||
      "Failed to save treatment record";
    
    throw new Error(errorMessage);
  }
};

/**
 * Get all treatment records for a specific patient
 * @param {number} patientId - The ID of the patient
 * @returns {Promise<Array>} - Array of treatment records
 * @throws {Error} - If the API call fails
 */
export const getTreatmentsByPatient = async (patientId) => {
  try {
    // Validate patient ID
    if (! patientId) {
      throw new Error("Patient ID is required");
    }

    const response = await axios.get(`${BASE_URL}/patient/${patientId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching patient treatments:", err);
    
    // Handle 404 - no treatments found
    if (err.response?.status === 404) {
      return []; // Return empty array instead of throwing error
    }
    
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch patient treatments";
    
    throw new Error(errorMessage);
  }
};

/**
 * Get all treatment records
 * @returns {Promise<Array>} - Array of all treatment records
 * @throws {Error} - If the API call fails
 */
export const getAllTreatmentRecords = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching all treatment records:", err);
    
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch treatment records";
    
    throw new Error(errorMessage);
  }
};

/**
 * Get a single treatment record by ID
 * @param {number} recordId - The ID of the treatment record
 * @returns {Promise<Object>} - Treatment record object
 * @throws {Error} - If the API call fails
 */
export const getTreatmentById = async (recordId) => {
  try {
    if (!recordId) {
      throw new Error("Record ID is required");
    }

    const response = await axios.get(`${BASE_URL}/${recordId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching treatment record:", err);
    
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch treatment record";
    
    throw new Error(errorMessage);
  }
};

/**
 * Update an existing treatment record
 * @param {number} recordId - The ID of the record to update
 * @param {Object} recordData - Updated treatment record data
 * @returns {Promise<Object>} - Updated record
 * @throws {Error} - If the API call fails
 */
export const updateTreatmentRecord = async (recordId, recordData) => {
  try {
    if (!recordId) {
      throw new Error("Record ID is required");
    }

    const response = await axios.put(`${BASE_URL}/${recordId}`, recordData);
    return response.data;
  } catch (err) {
    console.error("Error updating treatment record:", err);
    
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to update treatment record";
    
    throw new Error(errorMessage);
  }
};

/**
 * Delete a treatment record
 * @param {number} recordId - The ID of the treatment record to delete
 * @returns {Promise<Object>} - Deletion confirmation
 * @throws {Error} - If the API call fails
 */
export const deleteTreatmentRecord = async (recordId) => {
  try {
    if (!recordId) {
      throw new Error("Record ID is required");
    }

    const response = await axios.delete(`${BASE_URL}/${recordId}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting treatment record:", err);
    
    const errorMessage =
      err. response?.data?.message ||
      err.message ||
      "Failed to delete treatment record";
    
    throw new Error(errorMessage);
  }
};