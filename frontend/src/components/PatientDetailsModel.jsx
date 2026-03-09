import React from "react";

/**
 * Modal component to display patient details and treatment history
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback to close the modal
 * @param {Object} patient - Patient data object
 * @param {Array} treatments - Array of treatment records
 */
const PatientDetailsModal = ({ isOpen, onClose, patient, treatments = [] }) => {
  // Don't render if modal is closed or patient data is missing
  if (!isOpen || ! patient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl max-h-[90vh] flex flex-col">
        
        {/* Header Section */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-cyan-800">Patient Details</h2>
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-brown-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Body Section - Scrollable content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Patient Information Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-cyan-700 border-b pb-2">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md: grid-cols-2 gap-4 bg-cyan-500/20 text-sm">
              <Info label="Patient ID" value={patient.id} />
              <Info label="Full Name" value={patient.name} />
              <Info label="Gender" value={patient.gender} />
              <Info label="Relationship Status" value={patient.relationship} />
              <Info label="Phone Number" value={patient.phone} />
              <Info label="Email Address" value={patient.email} />
              <Info label="Date of Birth" value={patient.birthDate} />
              <Info label="Address" value={patient.address} className="md:col-span-2" />
            </div>
          </div>

          {/* Past Treatments Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-cyan-700 border-b pb-2">
              Treatment History
            </h3>

            {! treatments || treatments.length === 0 ?  (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500">
                  No treatment history available for this patient.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
                        Diagnosis
                      </th>
                      <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
                        Treatment
                      </th>
                      <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
                        Dentist Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatments. map((treatment, index) => (
                      <tr
                        key={treatment.id || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border-b px-4 py-3">
                          {treatment.date || treatment.treatment_date || "-"}
                        </td>
                        <td className="border-b px-4 py-3">
                          {treatment.diagnosis || "-"}
                        </td>
                        <td className="border-b px-4 py-3">
                          {treatment.treatment || "-"}
                        </td>
                        <td className="border-b px-4 py-3">
                          {treatment.note || treatment.dentist_note || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-6 py-4 border-t flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      
      
    </div>
  );
};

/**
 * Reusable component to display label-value pairs
 * @param {string} label - Field label
 * @param {string|number} value - Field value
 * @param {string} className - Additional CSS classes
 */
const Info = ({ label, value, className = "" }) => (
  <div className={className}>
    <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">
      {label}
    </p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);

export default PatientDetailsModal;