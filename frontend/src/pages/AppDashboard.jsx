
import React, { useState, useEffect } from "react";
import WelcomeHeader from "../components/WelcomeHeader";
import SummarySection from "../components/SummarySection";
import { getAllAppointments } from "../api/appointmentApi";
import { saveTreatmentRecord } from "../api/recordsApi";

const AppDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH APPOINTMENTS ================= */
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments();

      const formattedData = data.map((appt) => ({
        id: appt.appointment_id,
        patientId: appt.patient_id,
        name: appt.patient_name || "Unknown Patient",
        date: appt.appointment_date,
        time: appt.start_time,
        status: appt.status || "Scheduled",
        diagnosis: appt.diagnosis || "",
        dentistNote: appt.dentist_note || "",
      }));

      setAppointments(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to load appointments. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredAppointments = appointments.filter((appt) =>
    (appt.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= POPUP ================= */
  const openPopup = (appt) => {
    setSelectedAppointment(appt);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };

  /* ================= SAVE/UPDATE ================= */
const handleSave = async (e) => {
  e.preventDefault();
  if (!selectedAppointment) return;

  const recordData = {
     patient_id: selectedAppointment.patientId,
    treatment_date: selectedAppointment.date,
    diagnosis: selectedAppointment.diagnosis || "",
    dentist_note: selectedAppointment.dentistNote || "",
  };

  try {
    await saveTreatmentRecord(recordData);
    alert("Record saved successfully!");

    // Refresh appointments list
    fetchAppointments();
    closePopup();
  } catch (err) {
    console.error("Error saving record:", err);
    alert("Failed to save record. " + (err.response?.data?.message || err.message));
  }
};

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen">
      <WelcomeHeader />

      <h1 className="text-3xl font-semibold text-gray-800 mt-10 mb-10">
        Appointments Management
      </h1>

      <SummarySection appointments={appointments} />


      {/* ================= POPUP MODAL ================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-96 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Update Appointment</h2>

            <form className="space-y-5" onSubmit={handleSave}>
              <div>
                <label className="text-sm text-gray-700">App ID</label>
                <input
                  type="text"
                  value={selectedAppointment?.id || ""}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedAppointment?.name || ""}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Date</label>
                <input
                  type="date"
                  value={selectedAppointment?.date || ""}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, date: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Time</label>
                <input
                  type="time"
                  value={selectedAppointment?.time || ""}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, time: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Diagnosis</label>
                <input
                  type="text"
                  value={selectedAppointment?.diagnosis || ""}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, diagnosis: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Dentist Note</label>
                <textarea
                  rows="3"
                  value={selectedAppointment?.dentistNote || ""}
                  onChange={(e) =>
                    setSelectedAppointment({ ...selectedAppointment, dentistNote: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Appointments
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-80 px-4 py-2 border rounded-lg"
        />

        {/* Loading */}
        {loading && <p>Loading appointments...</p>}

        {/* Error */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">View</th>
                  <th className="px-4 py-2 text-left">Update</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{appt.id}</td>
                      <td className="px-4 py-3">{appt.name}</td>
                      <td className="px-4 py-3">{appt.date}</td>
                      <td className="px-4 py-3">{appt.time}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            appt.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}

                        >
                          {appt.status}
                        </span>
                      </td>

                      {/* View */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openPopup(appt)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                      </td>

                      {/* Update */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openPopup(appt)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
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
    </div>
  );
};

export default AppDashboard;
