import React, { useState, useEffect } from "react";
import { Eye, Edit } from "lucide-react"; 
import WelcomeHeader from "../Admin/WelcomeHeader";
import SummarySection from "../Admin/SummarySection";

const AppDashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  // Load data from localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("app_appointments");
    return saved ? JSON.parse(saved) : []; 
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [formType, setFormType] = useState("regular"); 

  // Save to localStorage automatically
  useEffect(() => {
    localStorage.setItem("app_appointments", JSON.stringify(appointments));
  }, [appointments]);

  /* FILTER LOGIC */
  const filteredAppointments = appointments.filter((appt) => {
    const matchesName = appt.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  const openViewPopup = (appt) => {
    setSelectedAppointment(appt);
    setIsAddingNew(false);
    setIsReadOnly(true);
    setIsPopupOpen(true);
  };

  const openEditPopup = (appt) => {
    setSelectedAppointment(appt);
    setIsAddingNew(false);
    setIsReadOnly(false);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAppointment(null);
  };

  const handleAddAppointment = (e, formData) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setAppointments([...appointments, newEntry]);
    alert("Appointment saved permanently!");
    closePopup();
  };

  const handleUpdateAppointment = (e, formData) => {
    e.preventDefault();
    const updatedList = appointments.map((appt) =>
      appt.id === formData.id ? { ...appt, ...formData } : appt
    );
    setAppointments(updatedList);
    alert("Appointment updated permanently!");
    closePopup();
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-cyan-50 min-h-screen">
      <WelcomeHeader onAddNew={openRegular} onAddSpecial={openSpecial} />

      <h1 className="text-3xl font-semibold text-gray-800 mt-10 mb-10"></h1>

      <SummarySection appointments={appointments} />

      {/* POPUP MODAL */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              {isAddingNew ? "Add New Appointment" : isReadOnly ? "View Appointment" : "Update Appointment"}
            </h2>

            {isAddingNew ? (
              formType === "special" ? (
                <AddSpecialForm onSubmit={handleAddAppointment} onCancel={closePopup} />
              ) : (
                <AddRegularForm onSubmit={handleAddAppointment} onCancel={closePopup} />
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
      )}

      {/* TABLE SECTION */}
      <div className="bg-cyan-50 p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Appointments</h2>
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Appt ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">View</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500 border-b">No appointments found.</td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => {
                  const isSpecial = !!appt.treatmentType;
                  return (
                    <tr 
                      key={appt.id} 
                      className={`border-b transition duration-200 ${
                        isSpecial 
                          ? "bg-indigo-50/60 border-l-4 border-l-indigo-500 hover:bg-indigo-100/60" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{appt.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">{appt.patientId}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {appt.name} {isSpecial && <span className="ml-2 text-[10px] bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded uppercase font-bold">Special</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">{appt.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{appt.time}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
                          appt.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => openViewPopup(appt)} 
                          className="text-blue-500 hover:text-blue-700 transition-colors inline-flex items-center justify-center p-1" 
                          title="View"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => openEditPopup(appt)} 
                          className="text-cyan-500 hover:text-cyan-700 transition-colors inline-flex items-center justify-center p-1" 
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
    patientId: "", name: "", date: new Date().toISOString().split("T")[0],
    time: "17:00", status: "Scheduled", notes: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getTimeLimits = (dateString) => {
    const selectedDate = new Date(dateString);
    const day = selectedDate.getDay(); 
    const isWeekend = (day === 6 || day === 0);
    return isWeekend 
      ? { min: "10:00", max: "17:00", label: "Weekends: 10am - 5pm" }
      : { min: "16:00", max: "20:00", label: "Weekdays: 4pm - 8pm" };
  };

  const limits = getTimeLimits(formData.date);

  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Appt ID</label>
          <input value="Auto-generated" disabled className="mt-1 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-400 italic" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Patient ID</label>
          <input name="patientId" required onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Patient Name</label>
        <input name="name" required onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input name="date" type="date" value={formData.date} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Time</label>
          <input name="time" type="time" min={limits.min} max={limits.max} value={formData.time} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <p className="text-[10px] text-slate-500 mt-1">{limits.label}</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Status</label>
        <select name="status" onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
        <textarea name="notes" rows={3} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Add Appointment</button>
      </div>
    </form>
  );
};

/* --- ADD SPECIAL FORM (Weekends only, 5pm - 8pm) --- */
const AddSpecialForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: "", name: "", treatmentType: "Teeth Cleaning (Moderate)", 
    date: "", 
    time: "17:00", status: "Scheduled", notes: ""
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "date") {
      const selectedDate = new Date(value);
      const day = selectedDate.getUTCDay(); 
      if (day === 0 || day === 6) {
        setFormData({ ...formData, [name]: value });
        setError("");
      } else {
        setFormData({ ...formData, [name]: "" });
        setError("Please choose a weekend (Saturday or Sunday).");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Appt ID</label>
          <input value="Auto-generated" disabled className="mt-1 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-400 italic" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Patient ID</label>
          <input name="patientId" required onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Patient Name</label>
        <input name="name" required onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Treatment Type</label>
        <select name="treatmentType" value={formData.treatmentType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Teeth Cleaning (Moderate)</option>
          <option>Teeth Cleaning (Severe)</option>
          <option>Wisdom Teeth Removal</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Date (Weekend Only)</label>
          <input 
            name="date" 
            type="date" 
            required 
            value={formData.date} 
            onChange={handleChange} 
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" 
          />
          {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Time (5pm-8pm)</label>
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
        <label className="block text-sm font-medium text-slate-700">Status</label>
        <select name="status" onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
        <textarea name="notes" rows={3} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Add Appointment</button>
      </div>
    </form>
  );
};

/* --- EDIT / VIEW FORM --- */
const EditAppointmentForm = ({ appointment, onSubmit, onCancel, readOnly }) => {
  const [formData, setFormData] = useState({ ...appointment });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Appt ID</label>
          <input value={formData.id} disabled className="mt-1 w-full rounded-lg border border-slate-300 bg-gray-100 px-3 py-2 text-sm text-slate-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Patient ID</label>
          <input value={formData.patientId} disabled className="mt-1 w-full rounded-lg border border-slate-300 bg-gray-100 px-3 py-2 text-sm text-slate-600" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Patient Name</label>
        <input name="name" value={formData.name} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-500" />
      </div>
      {formData.treatmentType && (
        <div>
          <label className="block text-sm font-medium text-slate-700">Treatment Type</label>
          <select name="treatmentType" value={formData.treatmentType} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50">
            <option>Teeth Cleaning (Moderate)</option>
            <option>Teeth Cleaning (Severe)</option>
            <option>Wisdom Teeth Removal</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input name="date" type="date" value={formData.date} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Time</label>
          <input name="time" type="time" value={formData.time} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50">
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Additional Notes</label>
        <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} disabled={readOnly} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-gray-50" />
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end border-t pt-4">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {readOnly ? "Close" : "Cancel"}
        </button>
        {!readOnly && (
          <button type="submit" className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700">
            Update Appointment
          </button>
        )}
      </div>
    </form>
  );
};

export default AppDashboard;