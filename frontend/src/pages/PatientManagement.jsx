import { useState } from "react";

export default function PatientManagement() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <div className="p-6 bg-cyan-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cyan-700">
            Patient Management
          </h1>
          <p className="text-gray-600">
            Manage patient records and medical history
          </p>
        </div>

        <button
          onClick={() => setShowAppointmentForm(true)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
        >
          + New Appointment
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow">
        {/* <PatientRow
          name="John Smith"
          age="45"
          gender="Male"
          onView={() =>
            setSelectedPatient({
              name: "John Smith",
              age: 45,
              gender: "Male",
              blood: "O+",
              allergy: "Penicillin",
              treatments: ["Root Canal", "Cleaning", "X-Ray"],
            })
          }
        /> */}
        <p className="p-4 text-gray-500">Patient list will load here...</p>
      </div>

      {/* Modals */}
      {/* {selectedPatient && (
        <PatientProfileModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showAppointmentForm && (
        <NewAppointmentModal onClose={() => setShowAppointmentForm(false)} />
      )} */}
    </div>
  );
}
