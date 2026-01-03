import React, { useState, useEffect } from "react";
import WelcomeHeader from "../Admin/WelcomeHeader";
import SummarySection from "../Admin/SummarySection";


const AppDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FETCH APPOINTMENTS */
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch("/api/appointments");
      const data = await response.json();

      const formattedData = data.map((appt) => ({
        id: appt.appointmentId,
        patientId: appt.patientId,
        name: appt.fullName || "Unknown Patient",
        date: appt.appointmentDate,
        time: appt.startTime,
        status: appt.status || "Scheduled",
        diagnosis: appt.diagnosis || "",
        dentistNote: appt.dentist_note || "",
      }));

      setAppointments(formattedData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments. Please try again.");
      // Demo data for testing
      setAppointments([
        {
          id: "A001",
          patientId: "P001",
          name: "John Doe",
          date: today,
          time: "09:00",
          status: "Scheduled",
          diagnosis: "",
          dentistNote: "",
        },
        {
          id: "A002",
          patientId: "P002",
          name: "Jane Smith",
          date: today,
          time: "10:30",
          status: "Scheduled",
          diagnosis: "",
          dentistNote: "",
        },
        {
          id: "A003",
          patientId: "P003",
          name: "Mike Johnson",
          date: today,
          time: "14:00",
          status: "Completed",
          diagnosis: "Cavity in tooth #14",
          dentistNote: "Patient responded well to treatment",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER APPOINTMENTS */
  const filteredAppointments = appointments.filter((appt) => {
    const matchesName = appt.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = appt.date === selectedDate;
    return matchesName && matchesDate;
  });

  /* OPEN ADD NEW APPOINTMENT FORM */
  const openAddNew = () => {
    setIsAddingNew(true);
    setIsPopupOpen(true);
    setSelectedAppointment(null);
  };

  /* OPEN EDIT APPOINTMENT FORM */
  const openPopup = (appt) => {
    setSelectedAppointment(appt);
    setIsAddingNew(false);
    setIsPopupOpen(true);
  };

  /* CLOSE POPUP */
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
    setIsAddingNew(false);
  };

  /* SAVE NEW APPOINTMENT */
  const handleAddAppointment = async (e, formData) => {
    e.preventDefault();

    const newAppointmentData = {
      patientId: formData.patientId,
      fullName: formData.name,
      appointmentDate: formData.date,
      startTime: formData.time,
      status: formData.status,
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointmentData),
      });

      if (!response.ok) throw new Error("Failed to add appointment");

      alert("Appointment added successfully!");
      fetchAppointments();
      closePopup();
    } catch (err) {
      console.error("Error adding appointment:", err);
      alert("Failed to add appointment. " + err.message);
    }
  };

  /* SAVE/UPDATE APPOINTMENT */
  const handleSave = async (e, formData) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    const recordData = {
      patient_id: selectedAppointment.patientId,
      treatment_date: selectedAppointment.date,
      diagnosis: formData.diagnosis || "",
      dentist_note: formData.dentistNote || "",
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recordData),
      });

      if (!response.ok) throw new Error("Save failed");

      alert("Record saved successfully!");
      fetchAppointments();
      closePopup();
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Failed to save record. " + err.message);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen">
      <WelcomeHeader onAddNew={openAddNew} />

      <h1 className="text-3xl font-semibold text-gray-800 mt-10 mb-10">
        Appointments Management
      </h1>

      <SummarySection />

      {/* POPUP MODAL FOR ADD/EDIT */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {isAddingNew ? "Add New Appointment" : "Update Appointment"}
            </h2>

            {isAddingNew ? (
              <AddAppointmentForm
                onSubmit={handleAddAppointment}
                onCancel={closePopup}
              />
            ) : (
              <EditAppointmentForm
                appointment={selectedAppointment}
                onSubmit={handleSave}
                onCancel={closePopup}
              />
            )}
          </div>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Appointments
        </h2>

        {/* Search + Date Filter Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center py-8 text-gray-500">
            Loading appointments...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center py-8 text-red-600">{error}</p>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Patient Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    View
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-8 text-gray-500 border-b"
                    >
                      No appointments found for {selectedDate}
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {appt.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {appt.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {appt.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {appt.time}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${
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
                          onClick={() => openPopup(appt)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                        >
                          View
                        </button>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openPopup(appt)}
                          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-sm font-medium"
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

/* ADD APPOINTMENT FORM COMPONENT */
const AddAppointmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    status: "Scheduled",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-5" onSubmit={(e) => onSubmit(e, formData)}>
      <div>
        <label className="text-sm text-gray-700">Patient ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter patient ID"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Patient Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter patient name"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Add Appointment
        </button>
      </div>
    </form>
  );
};

/* EDIT APPOINTMENT FORM COMPONENT */
const EditAppointmentForm = ({ appointment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: appointment?.id || "",
    name: appointment?.name || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    diagnosis: appointment?.diagnosis || "",
    dentistNote: appointment?.dentistNote || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-5" onSubmit={(e) => onSubmit(e, formData)}>
      <div>
        <label className="text-sm text-gray-700">Appointment ID</label>
        <input
          type="text"
          value={formData.id}
          disabled
          className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          disabled
          className="w-full p-2 border rounded-lg bg-gray-100 text-gray-600"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Diagnosis</label>
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter diagnosis"
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Dentist Note</label>
        <textarea
          rows="3"
          name="dentistNote"
          value={formData.dentistNote}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter dentist notes"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AppDashboard;