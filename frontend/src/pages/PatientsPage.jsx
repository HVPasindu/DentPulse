import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import AddPatientModal from '../Admin/AddPatientModal';
import PatientProfile from '../Admin/PatientProfile';

const PatientsPage = () => {
  const [patients, setPatients] = useState([
    {
      id: 'PT-001',
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@email.com',
      address: '123 Main St, New York, NY',
      lastVisit: '2024-01-15',
      status: 'Active',
      treatments: [
        { id: 1, date: '2024-01-15', procedure: 'Dental Cleaning', doctor: 'Dr. Smith', cost: 150 },
        { id: 2, date: '2023-12-10', procedure: 'Filling', doctor: 'Dr. Johnson', cost: 200 },
      ],
      billing: [
        { id: 1, date: '2024-01-15', description: 'Dental Cleaning', amount: 150, status: 'Paid' },
        { id: 2, date: '2023-12-10', description: 'Filling', amount: 200, status: 'Paid' },
      ]
    },
    {
      id: 'PT-002',
      name: 'James Wilson',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 234-5678',
      email: 'james.w@email.com',
      address: '456 Oak Ave, Los Angeles, CA',
      lastVisit: '2024-01-18',
      status: 'Active',
      treatments: [
        { id: 1, date: '2024-01-18', procedure: 'Root Canal', doctor: 'Dr. Brown', cost: 800 },
      ],
      billing: [
        { id: 1, date: '2024-01-18', description: 'Root Canal', amount: 800, status: 'Pending' },
      ]
    },
    {
      id: 'PT-003',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 345-6789',
      email: 'emily.d@email.com',
      address: '789 Pine Rd, Chicago, IL',
      lastVisit: '2023-12-20',
      status: 'Inactive',
      treatments: [
        { id: 1, date: '2023-12-20', procedure: 'Teeth Whitening', doctor: 'Dr. Lee', cost: 300 },
      ],
      billing: [
        { id: 1, date: '2023-12-20', description: 'Teeth Whitening', amount: 300, status: 'Paid' },
      ]
    },
    {
      id: 'PT-004',
      name: 'Michael Brown',
      age: 38,
      gender: 'Male',
      phone: '+1 (555) 456-7890',
      email: 'michael.b@email.com',
      address: '321 Elm St, Houston, TX',
      lastVisit: '2024-01-22',
      status: 'Active',
      treatments: [
        { id: 1, date: '2024-01-22', procedure: 'Crown Placement', doctor: 'Dr. Smith', cost: 1200 },
      ],
      billing: [
        { id: 1, date: '2024-01-22', description: 'Crown Placement', amount: 1200, status: 'Paid' },
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAllPatients, setShowAllPatients] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const displayedPatients = showAllPatients ? filteredPatients : filteredPatients.slice(0, 5);

  const addPatient = (newPatient) => {
    const patient = {
      ...newPatient,
      id: `PT-${String(patients.length + 1).padStart(3, '0')}`,
      status: 'Active',
      treatments: [],
      billing: []
    };
    setPatients([...patients, patient]);
    setShowAddModal(false);
  };

  const deletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50 p-4 md:p-8">

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Patient Management</h1>
            <p className="text-sm md:text-base text-gray-600">Manage and view all patient records</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>New Patient</span>
          </button>
        </div>

        {/* Search Bar - Fully Responsive */}
        <div className="relative w-full">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, ID, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>
      </div>


      {/* Patients Table - Fully Responsive */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              All Patients ({filteredPatients.length})
            </h2>
            {filteredPatients.length > 5 && (
              <button
                onClick={() => setShowAllPatients(!showAllPatients)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm md:text-base"
              >
                {showAllPatients ? 'Show Less' : 'View All'}
              </button>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            {displayedPatients.map((patient) => (
              <div key={patient.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                   
                  </span>
                </div>
                <div className="space-y-1 mb-3 text-sm">
                  <p className="text-gray-600"><span className="font-medium">Age:</span> {patient.age}</p>
                  <p className="text-gray-600"><span className="font-medium">Gender:</span> {patient.gender}</p>
                  <p className="text-gray-600"><span className="font-medium">Phone:</span> {patient.phone}</p>
                  <p className="text-gray-600"><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-cyan-200 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{patient.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{patient.age}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{patient.gender}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{patient.phone}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No patients found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onAdd={addPatient}
        />
      )}

      {selectedPatient && (
        <PatientProfile
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientsPage;