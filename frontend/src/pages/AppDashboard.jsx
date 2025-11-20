import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import SummarySection from "../components/SummarySection";

const AppDashboard = () => {


  const [appointments, _setAppointments] = useState([
    { id: 1, name: "John Doe", date: "2025-11-14", time: "10:30 AM", status: "Scheduled" },
    { id: 2, name: "Jane Smith", date: "2025-11-15", time: "02:00 PM", status: "Scheduled" },
    { id: 3, name: "Michael Lee", date: "2025-11-16", time: "11:00 AM", status: "Completed" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const filteredAppointments = appointments.filter((appt) =>
    appt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

        const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState(null);

const openPopup = (appt) => {
  setSelectedAppointment(appt);
  setIsPopupOpen(true);
};

const closePopup = () => {
  setIsPopupOpen(false);
  setSelectedAppointment(null);
};

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen">
      <WelcomeHeader />

      <h1 className="text-3xl font-semibold text-gray-800 mt-10 mb-10">
        Appointments Management
      </h1>

      <SummarySection />

      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    
    <div className="bg-white p-6 w-96 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Update Appointment</h2>

      <form className="space-y-5">

        <div>
          <label className="text-sm text-gray-700">App-Id</label>
          <input
            type="id"
            defaultValue={selectedAppointment?.id}
            className="w-full p-2 border rounded-lg"
          />
        </div> 

        <div>
          <label className="text-sm text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={selectedAppointment?.name}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Date</label>
          <input
            type="date"
            defaultValue={selectedAppointment?.date}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Time</label>
          <input
            type="time"
            defaultValue={selectedAppointment?.time}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      
        <div>
          <label className="text-sm text-gray-700">Description</label>
          <input
            type="text"
             defaultValue = ""
           // defaultValue={selectedAppointment?.time}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={closePopup}
            type="button"
            className="px-3 py-1 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  </div>
)}





      <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-gray-300 mt-6">
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Appointments</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        

        <div className="grid grid-cols-7 font-semibold text-cyan-700 border-b pb-2 mb-3">
          <span>App-Id</span>
          <span>Name</span>
          <span>Date</span>
          <span>Time</span>
          <span>Status</span>
          <span>View Records</span>
          <span>Record update</span>
        </div>

        <div className="space-y-2">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="grid grid-cols-7 font-semibold text-gray-700 border-b pb-2 mb-3 px-3"
            >
              <span className="font-medium text-lg text-gray-800">{appt.id}</span>
              <span className="font-medium text-lg text-gray-800">{appt.name}</span>
              <span className="text-sm text-gray-600 mt-1">{appt.date}</span>
              <span className="text-sm text-gray-600">{appt.time}</span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium 
                ${appt.status === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {appt.status}
              </span>

              <button
                onClick={() => navigate(`/view-records/${appt.id}`)}
                className="w-30 px-3 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                View
              </button>
              <button
                onClick={() => openPopup(appt)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Update
              </button>


            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AppDashboard;
