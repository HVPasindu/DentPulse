export default function PatientProfileModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[600px] rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Patient Profile</h2>

        {/* Header Card */}
        <div className="bg-cyan-50 border border-cyan-500 rounded-xl p-4 flex gap-4 mb-6">
          <div className="w-14 h-14 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
            JS
          </div>

          <div>
            <h3 className="font-semibold">{patient.name}</h3>
            <p className="text-sm text-gray-600">
              {patient.age} years old · {patient.gender}
            </p>
            <span className="inline-block mt-1 text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
        </div>

        {/* Medical Info */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Medical Information</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3 bg-red-50">
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-semibold">{patient.blood}</p>
            </div>

            <div className="border rounded-lg p-3 bg-orange-50">
              <p className="text-sm text-gray-500">Allergies</p>
              <p className="font-semibold">{patient.allergy}</p>
            </div>
          </div>
        </div>

        {/* Past Treatments */}
        <div>
          <h4 className="font-semibold mb-2">Past Treatments</h4>
          <ul className="list-disc list-inside text-gray-700">
            {patient.treatments.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
