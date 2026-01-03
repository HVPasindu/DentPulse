import { X, User, Activity } from 'lucide-react';

const PatientProfile = ({ patient, onClose }) => {
  // Calculate total cost of treatments
  const totalCost = patient.treatments
    ? patient.treatments.reduce((sum, t) => sum + t.cost, 0)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-primary-600 font-bold text-lg md:text-2xl">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{patient.name}</h2>
              <p className="text-sm md:text-base text-primary-100">Patient ID: {patient.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-500 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content - Two Frames Side by Side on Desktop */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Frame 1: Patient Information */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <User size={20} className="text-primary-600" />
                <h3 className="font-semibold text-gray-800">Patient Information</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                  <p className="text-sm md:text-base text-gray-800 font-medium">{patient.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Age</label>
                  <p className="text-sm md:text-base text-gray-800">{patient.age} years</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Gender</label>
                  <p className="text-sm md:text-base text-gray-800">{patient.gender}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                  <p className="text-sm md:text-base text-gray-800">{patient.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                  <p className="text-sm md:text-base text-gray-800 break-all">{patient.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                  <p className="text-sm md:text-base text-gray-800">{patient.address}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                    patient.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Last Visit</label>
                  <p className="text-sm md:text-base text-gray-800">{patient.lastVisit}</p>
                </div>
              </div>
            </div>

            {/* Frame 2: Past Treatments (with total cost) */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <Activity size={20} className="text-green-600" />
                <h3 className="font-semibold text-gray-800">Past Treatments</h3>
              </div>
              <div className="p-4">
                {patient.treatments && patient.treatments.length > 0 ? (
                  <div className="space-y-4">
                    {patient.treatments.map((treatment) => (
                      <div key={treatment.id} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm md:text-base">{treatment.procedure}</h4>
                          <span className="text-xs md:text-sm text-gray-500">{treatment.date}</span>
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-green-700">Cost: ${treatment.cost}</p>
                      </div>
                    ))}
                    <div className="border-t-2 border-gray-300 pt-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Total Cost:</span>
                        <span className="text-xl md:text-2xl font-bold text-primary-600">
                          ${totalCost}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">No treatment history available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 md:px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
