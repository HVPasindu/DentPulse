import React, { useState, useEffect } from "react";
import WelcomeHeader from "../components/WelcomeHeader";
import SummarySection from "../components/SummarySection";
import PatientDetailsModal from "../components/PatientDetailsModel";
import { getAllAppointments } from "../api/appointmentApi";
import { saveTreatmentRecord } from "../api/recordsApi";
import { getPatientById } from "../api/patientApi";
import { getTreatmentsByPatient } from "../api/recordsApi";
import SuccessModal from "../components/SuccessModal";

const AppDashboard = () => {
  // ============= STATE MANAGEMENT =============
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Popup state for updating appointments
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // Success modal state
const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Patient modal state
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientTreatments, setPatientTreatments] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);

  /* ================= FETCH APPOINTMENTS ================= */
  useEffect(() => {
    fetchAppointments();
  }, []);

  /**
   * Fetches all appointments from the API
   */
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAppointments();

      // Transform API data to match component structure
      const formattedData = data.map((appt) => ({
        id: appt. appointmentId,
        patientId: appt.patientId,
        name: appt. fullName || "Unknown Patient",
        date:  appt.appointmentDate,
        time: appt.startTime,
        status: appt. status || "Scheduled",
        diagnosis: appt.diagnosis || "",
        dentistNote: appt.dentist_note || "",
      }));

      setAppointments(formattedData);
    } catch (err) {
      setError("Failed to load appointments.  Please try again.");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER APPOINTMENTS ================= */
  /**
   * Filters appointments by patient name and selected date
   */
  const filteredAppointments = appointments.filter((appt) => {
    const matchesName = (appt.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = appt.date === selectedDate;
    return matchesName && matchesDate;
  });


  const openPopup = (appt) => {
  setSelectedAppointment({ 
    ...appt, 
    treatmentType: appt.treatmentType || "FILLING" // default value
  });
  setIsPopupOpen(true);
};


  /**
   * Closes the update popup and resets state
   */
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };

  /* ================= SAVE/UPDATE TREATMENT RECORD ================= */
  /**
   * Saves or updates a treatment record
   */

  const handleSave = async (e) => {
  e.preventDefault();
  if (!selectedAppointment) return;

  // Prepare data for API
  const recordData = {
    patient_id: selectedAppointment.patientId,
    treatment_date: selectedAppointment.date,
    diagnosis: selectedAppointment.diagnosis || "",
    treatmentType: selectedAppointment.treatmentType,
    dentist_note: selectedAppointment.dentistNote || "",
  };

  try {
    await saveTreatmentRecord(recordData);
    
    // ✅ CHANGED: Show custom modal instead of alert
    closePopup(); // Close the update form first
    setShowSuccessModal(true); // Show success modal

    // Refresh appointments list to show updated data
    await fetchAppointments();
    
  } catch (err) {
    console.error("Error saving record:", err);
    const errorMessage = err.response?.data?.message || err.message || "Unknown error";
    alert("Failed to save record: " + errorMessage);
  }
};

  /* ================= VIEW PATIENT DETAILS ================= */
  /**
   * Fetches and displays patient details and treatment history
   */
  const handleViewPatient = async (appt) => {
    try {
      setPatientLoading(true);
      
      // Fetch patient information
      const patient = await getPatientById(appt.patientId);

      // Fetch treatment history
      // const treatments = await getTreatmentsByPatient(appt.patientId);

      // Set patient data
      setSelectedPatient({
        id: patient.patientId,
        name: patient.fullName,
        gender: patient.gender,
        relationship: patient.relationship,
        phone: patient.phone,
        email: patient.email,
        birthDate: patient.birthDate,
        address: patient.address,
      });

      // Set treatments (default to empty array if none)
      // setPatientTreatments(treatments || []);
      
      // Open modal
      setIsPatientModalOpen(true);
    } catch (err) {
      console.error("Error loading patient details:", err);
      alert("Failed to load patient details.  Please try again.");
    } finally {
      setPatientLoading(false);
    }
  };

  /**
   * Closes patient details modal and resets state
   */
  const handleClosePatientModal = () => {
    setIsPatientModalOpen(false);
    setSelectedPatient(null);
    setPatientTreatments([]);
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex-1 p-6 md:p-8 bg-white min-h-screen">
      <WelcomeHeader />

      <h1 className="text-3xl font-semibold text-green-600 mt-10 mb-10">
        Appointments Management
      </h1>

      <SummarySection appointments={appointments} />

      {/* ================= UPDATE APPOINTMENT POPUP ================= */}
      {isPopupOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Update Appointment</h2>

            <form className="space-y-4" onSubmit={handleSave}>
              {/* Appointment ID - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment ID
                </label>
                <input
                  type="text"
                  value={selectedAppointment.id}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed border-green-500"
                />
              </div>

              {/* Patient Name - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={selectedAppointment.name}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedAppointment.date}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      date: e. target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={selectedAppointment.time}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      time: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Treatment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Treatment Type
                </label>
                <select
                  value={selectedAppointment.treatmentType}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      treatmentType: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="FILLING">Filling</option>
                  <option value="EXTRACTION">Extraction</option>
                  <option value="CLEANING">Cleaning</option>
                  <option value="ROOT_CANAL">Root Canal</option>
                  <option value="IMPLANT">Implant</option>
                  <option value="WHITENING">Whitening</option>
                  <option value="Other">Other</option>
                </select>
              </div>


              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={selectedAppointment.diagnosis}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      diagnosis: e.target.value,
                    })
                  }
                  placeholder="Enter diagnosis..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Dentist Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dentist Note
                </label>
                <textarea
                  rows="3"
                  value={selectedAppointment.dentistNote}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      dentistNote: e.target.value,
                    })
                  }
                  placeholder="Enter notes..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= APPOINTMENTS TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          Appointments Schedule
        </h2>

        {/* Search and Date Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-green-500 rounded-lg focus: ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Appointments Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Patient Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                    View Details
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-8 text-gray-500"
                    >
                      No appointments found for {selectedDate}
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">{appt.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {appt.name}
                      </td>
                      <td className="px-4 py-3 text-sm">{appt.date}</td>
                      <td className="px-4 py-3 text-sm">{appt.time}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appt.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : appt.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewPatient(appt)}
                          disabled={patientLoading}
                          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                        >
                          {patientLoading ?  "Loading..." : "View"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openPopup(appt)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= PATIENT DETAILS MODAL ================= */}
      <PatientDetailsModal
        isOpen={isPatientModalOpen}
        onClose={handleClosePatientModal}
        patient={selectedPatient}
        treatments={patientTreatments}
      />
      {/* ================= SUCCESS MODAL ================= */}
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Updated Successfully!"
      />
    </div>
  );
};

export default AppDashboard;
