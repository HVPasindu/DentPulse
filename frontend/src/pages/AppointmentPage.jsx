import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react";
import Swal from "sweetalert2";
import { errorAlert } from "../utils/alert";
import WelcomeHeader from "../Admin/WelcomeHeader";
import SummarySection from "../Admin/SummarySection";
import { fetchAllAppointments } from "../api/adminAppointmentApi";
import { fetchAppointmentById } from "../api/adminAppointmentApi";
import { updateAppointmentStatus } from "../api/adminAppointmentApi";
import { fetchAppointmentStats } from "../api/adminAppointmentApi";
import { createAppointment } from "../api/adminAppointmentApi";
import { fetchPatientById } from "../api/adminPatientApi";

const AppDashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [formType, setFormType] = useState("regular");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetchAppointmentStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats");
    }
  };

  /* ================= FETCH APPOINTMENTS FROM BACKEND ================= */
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchAllAppointments();

      const mappedAppointments = res.data.map((appt) => ({
        id: appt.appointmentId,
        patientId: appt.patientId,
        name: appt.fullName,
        date: appt.appointmentDate,
        time: appt.startTime,
        status: appt.status,
        type: appt.type,
      }));

      setAppointments(mappedAppointments);
    } catch (err) {
      console.error("Failed to load appointments", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadStats();
  }, []);

  /* FILTER LOGIC */
  const filteredAppointments = appointments.filter((appt) => {
    const matchesName = appt.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const apptDate = appt.date ? appt.date.split("T")[0] : "";
    return matchesName && apptDate === selectedDate;
  });

  /* HANDLERS */
  const openRegular = () => {
    setFormType("regular");
    setIsAddingNew(true);
    setIsReadOnly(false);
    setIsPopupOpen(true);
    setSelectedAppointment(null);
  };

  const openSpecial = () => {
    setFormType("special");
    setIsAddingNew(true);
    setIsReadOnly(false);
    setIsPopupOpen(true);
    setSelectedAppointment(null);
  };

  const openViewPopup = async (appt) => {
    try {
      setLoading(true);

      const res = await fetchAppointmentById(appt.id);

      const data = res.data;

      const mappedAppointment = {
        id: data.appointmentId,
        patientId: data.patientId,
        name: data.patientName,
        contact: data.patientPhone,
        date: data.appointmentDate,
        time: data.startTime,
        status: data.status,
        type: data.type,
        email: data.email,
        address: data.address,
      };

      setSelectedAppointment(mappedAppointment);
      setIsAddingNew(false);
      setIsReadOnly(true);
      setIsPopupOpen(true);
    } catch (err) {
      console.error(err);
      errorAlert("Failed to load appointment details");
    } finally {
      setLoading(false);
    }
  };

  const openEditPopup = async (appt) => {
    try {
      setLoading(true);

      const res = await fetchAppointmentById(appt.id);
      const data = res.data;

      const mappedAppointment = {
        id: data.appointmentId,
        patientId: data.patientId,
        name: data.patientName,
        contact: data.patientPhone,
        email: data.email,
        address: data.address,
        date: data.appointmentDate,
        time: data.startTime,
        status: data.status,
        type: data.type,
      };

      setSelectedAppointment(mappedAppointment);
      setIsAddingNew(false);
      setIsReadOnly(false); // 🔥 editable
      setIsPopupOpen(true);
    } catch (err) {
      console.error(err);
      errorAlert("Failed to load appointment details");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };

  const handleAddAppointment = async (e, formData) => {
    e.preventDefault();

    try {
      const payload = {
        patientId: Number(formData.patientId),
        appointmentDate: formData.date,
        startTime: formData.time,
        appointmentType: formType === "special" ? "SPECIAL" : "NORMAL",
        status: formData.status,
      };

      // 👇 only for special appointments
      //  if (formType === "special") {
      //    payload.treatmentType = mapTreatment(formData.treatmentType);
      //  }

      await createAppointment(payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Appointment added successfully!",
        confirmButtonColor: "#16a34a",
      });
      closePopup();

      // reload table + summary
      loadAppointments();
      loadStats();
    } catch (err) {
      console.error(err);
      errorAlert("Failed to add appointment");
    }
  };

  const handleUpdateAppointment = async (e, formData) => {
    e.preventDefault();

    try {
      await updateAppointmentStatus(formData.id, formData.status);

      // update appointment list UI
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === formData.id ? { ...appt, status: formData.status } : appt
        )
      );

      // 🔥 IMPORTANT: reload summary stats
      await loadStats();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Appointment status updated!",
        confirmButtonColor: "#16a34a",
      });
      closePopup();
    } catch (err) {
      console.error(err);
      errorAlert("Failed to update appointment status");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-green-50 min-h-screen">
      <WelcomeHeader onAddNew={openRegular} onAddSpecial={openSpecial} />

      <h1 className="text-3xl font-semibold text-gray-800 mt-10 mb-10"></h1>

      <SummarySection stats={stats} />

      {/* POPUP MODAL */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-slate-800">
                {isAddingNew
                  ? "Add New Appointment"
                  : isReadOnly
                  ? "View Appointment"
                  : "Update Appointment"}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isAddingNew ? (
                formType === "special" ? (
                  <AddSpecialForm
                    onSubmit={handleAddAppointment}
                    onCancel={closePopup}
                  />
                ) : (
                  <AddRegularForm
                    onSubmit={handleAddAppointment}
                    onCancel={closePopup}
                  />
                )
              ) : (
                <EditAppointmentForm
                  appointment={selectedAppointment}
                  onSubmit={handleUpdateAppointment}
                  onCancel={closePopup}
                  readOnly={isReadOnly}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="bg-cyan-50 p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Appointments
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Appt ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Patient ID
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
                    colSpan="8"
                    className="text-center py-8 text-gray-500 border-b"
                  >
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => {
                  const isSpecial = appt.type === "SPECIAL";

                  return (
                    <tr
                      key={appt.id}
                      className={`border-b transition duration-200 ${
                        isSpecial
                          ? "bg-indigo-50/60 border-l-4 border-l-indigo-500 hover:bg-indigo-100/60"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {appt.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                        {appt.patientId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {appt.name}{" "}
                        {isSpecial && (
                          <span className="ml-2 text-[10px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded uppercase font-bold">
                            Special
                          </span>
                        )}
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
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openViewPopup(appt)}
                          className="text-green-500 hover:text-green-700 transition-colors inline-flex items-center justify-center p-1"
                          title="View"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openEditPopup(appt)}
                          className="text-green-500 hover:text-green-700 transition-colors inline-flex items-center justify-center p-1"
                          title="Update"
                        >
                          <Edit size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- ADD REGULAR FORM (With Time Restrictions) --- */
const AddRegularForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    date: new Date().toISOString().split("T")[0],
    time: "17:00",
    status: "PENDING",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getTimeLimits = (dateString) => {
    const selectedDate = new Date(dateString);
    const day = selectedDate.getDay();
    const isWeekend = day === 6 || day === 0;
    return isWeekend
      ? { min: "10:00", max: "17:00", label: "Weekends: 10am - 5pm" }
      : { min: "16:00", max: "20:00", label: "Weekdays: 4pm - 8pm" };
  };

  const limits = getTimeLimits(formData.date);

  return (
    <form
      onSubmit={(e) => onSubmit(e, formData)}
      className="space-y-4 flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient ID
          </label>
          <input
            name="patientId"
            value={formData.patientId}
            onChange={async (e) => {
              const patientId = e.target.value;

              setFormData((prev) => ({
                ...prev,
                patientId,
              }));

              // 🟢 ID clear nam → error + data clear
              if (!patientId) {
                setError("");
                setFormData((prev) => ({
                  ...prev,
                  name: "",
                  contact: "",
                  email: "",
                  address: "",
                }));
                return;
              }

              try {
                const res = await fetchPatientById(patientId);
                const patient = res.data;

                // 🟢 VALID ID → error clear
                setError("");

                setFormData((prev) => ({
                  ...prev,
                  name: patient.fullName,
                  contact: patient.phone,
                  email: patient.email,
                  address: patient.address,
                }));
              } catch (err) {
                // 🔴 INVALID ID → error set + clear data
                setError("Patient not found");

                setFormData((prev) => ({
                  ...prev,
                  name: "",
                  contact: "",
                  email: "",
                  address: "",
                }));
              }
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient Name
          </label>
          <input
            name="name"
            value={formData.name}
            readOnly
            required
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Phone Number *
          </label>
          <input
            name="contact"
            type="tel"
            value={formData.contact}
            readOnly
            required
            onChange={handleChange}
            placeholder="Phone number"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            readOnly
            onChange={handleChange}
            placeholder="email@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Address *
          </label>
          <input
            name="address"
            value={formData.address}
            readOnly
            required
            onChange={handleChange}
            placeholder="Street address, City, State"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Time
            </label>
            <input
              name="time"
              type="time"
              min={limits.min}
              max={limits.max}
              value={formData.time}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <p className="text-[10px] text-slate-500 mt-1">{limits.label}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>PENDING</option>
            <option>SCHEDULED</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
        >
          Add Appointment
        </button>
      </div>
    </form>
  );
};

/* --- ADD SPECIAL FORM (Weekends only, 5pm - 8pm) --- */
const AddSpecialForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    treatmentType: "Teeth Cleaning (Moderate)",
    date: "",
    time: "17:00",
    status: "PENDING",
    notes: "",
  });

  const [patientError, setPatientError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const day = selectedDate.getUTCDay();

      if (day === 0 || day === 6) {
        setFormData({ ...formData, date: value });
        setDateError("");
      } else {
        setFormData({ ...formData, date: "" });
        setDateError("Please choose a weekend (Saturday or Sunday).");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e, formData)}
      className="space-y-4 flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient ID
          </label>
          <input
            name="patientId"
            value={formData.patientId}
            onChange={async (e) => {
              const patientId = e.target.value;

              setFormData((prev) => ({ ...prev, patientId }));

              if (!patientId) {
                setPatientError("");
                setFormData((prev) => ({
                  ...prev,
                  name: "",
                  contact: "",
                  email: "",
                  address: "",
                }));
                return;
              }

              try {
                const res = await fetchPatientById(patientId);
                const patient = res.data;

                setPatientError("");

                setFormData((prev) => ({
                  ...prev,
                  name: patient.fullName,
                  contact: patient.phone,
                  email: patient.email,
                  address: patient.address,
                }));
              } catch (err) {
                setPatientError("Patient not found");

                setFormData((prev) => ({
                  ...prev,
                  name: "",
                  contact: "",
                  email: "",
                  address: "",
                }));
              }
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {patientError && (
            <p className="text-xs text-red-500 mt-1">{patientError}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient Name
          </label>
          <input
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Phone Number *
          </label>
          <input
            name="contact"
            type="tel"
            required
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone number"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Address *
          </label>
          <input
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Street address, City, State"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Treatment Type
          </label>
          <select
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>FILLING</option>
            <option>EXTRACTION</option>
            <option>CLEANING</option>
            <option>WHITENING</option>
            <option>IMPLANT</option>
            <option>ROOT_CANAL</option>
            <option>OTHER</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date (Weekend Only)
            </label>
            <input
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            {dateError && (
              <p className="text-[10px] text-red-500 mt-1">{dateError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Time (5pm-8pm)
            </label>
            <input
              name="time"
              type="time"
              min="17:00"
              max="20:00"
              required
              value={formData.time}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>PENDING</option>
            <option>SCHEDULED</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
        >
          Add Appointment
        </button>
      </div>
    </form>
  );
};

/* --- EDIT / VIEW FORM --- */
const EditAppointmentForm = ({ appointment, onSubmit, onCancel, readOnly }) => {
  const [formData, setFormData] = useState({ ...appointment });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => onSubmit(e, formData)}
      className="space-y-4 flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Appt ID
          </label>
          <input
            value={formData.id}
            disabled
            className="mt-1 w-full rounded-lg border border-slate-300 bg-gray-100 px-3 py-2 text-sm text-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient ID
          </label>
          <input
            value={formData.patientId}
            disabled
            className="mt-1 w-full rounded-lg border border-slate-300 bg-gray-100 px-3 py-2 text-sm text-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Patient Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Contact
          </label>
          <input
            name="contact"
            type="tel"
            value={formData.contact || ""}
            onChange={handleChange}
            disabled
            placeholder="Phone number"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled
            placeholder="email@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Address
          </label>
          <input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            disabled
            placeholder="Street address, City, State"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
        {formData.treatmentType && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Treatment Type
            </label>
            <select
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleChange}
              disabled={readOnly}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50"
            >
              <option>FILLING</option>
              <option>EXTRACTION</option>
              <option>CLEANING</option>
              <option>WHITENING</option>
              <option>IMPLANT</option>
              <option>ROOT_CANAL</option>
              <option>OTHER</option>
            </select>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={readOnly}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Time
            </label>
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              disabled={readOnly}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={readOnly}
          >
            <option value="PENDING">Pending</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          {readOnly ? "Close" : "Cancel"}
        </button>
        {!readOnly && (
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Update Appointment
          </button>
        )}
      </div>
    </form>
  );
};

export default AppDashboard;
