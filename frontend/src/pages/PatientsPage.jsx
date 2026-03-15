import { useState, useEffect } from "react";
import { Search, Plus, Eye } from "lucide-react";
import AddPatientModal from "../Admin/AddPatientModal";
import PatientProfile from "../Admin/PatientProfile";
import { useLocation } from "react-router-dom";
import { getAllPatients } from "../api/adminPatientPageApi";
import { getPatientById, getPatientHistory } from "../api/adminPatientPageApi";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAllPatients, setShowAllPatients] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const displayedPatients = showAllPatients
    ? filteredPatients
    : filteredPatients.slice(0, 5);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();

      const mappedPatients = data.map((p) => ({
        id: `PT-${String(p.id).padStart(3, "0")}`,
        name: p.fullName,
        age: p.age,
        gender: p.gender,
        phone: p.phone,
        email: p.email || "",
      }));

      setPatients(mappedPatients);
    } catch (error) {
      console.error("Failed to load patients", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (location?.state?.openAdd) {
      setShowAddModal(true);
    }
  }, [location]);

  // 👇 MEKA ALUTHEN ADD KARANNA ONE
  const handleViewPatient = async (patient) => {
    try {
      const numericId = Number(patient.id.replace("PT-", ""));
      const patientInfo = await getPatientById(numericId);
      const history = await getPatientHistory(numericId);

      const mappedPatient = {
        id: patient.id,
        name: patientInfo.fullName,
        age: patientInfo.age,
        gender: patientInfo.gender,
        phone: patientInfo.phone,
        email: patientInfo.email,
        address: patientInfo.address,
        hasNIC: patientInfo.nic ? "yes" : "no",
        nicNumber: patientInfo.nic,
        treatments: history.map((t) => ({
          treatment_id: t.treatment_id,
          treatmentType: t.treatmentType, // ✅ FROM API
          treatment_service: t.treatment_service, // ✅ FROM API
          treatment_date: t.treatment_date, // ✅ FROM API
          cost: t.cost, // ✅ FROM API
        })),
      };

      setSelectedPatient(mappedPatient);
    } catch (error) {
      console.error("Failed to load patient profile", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              Patient Management
            </h1>
            <p className="text-sm md:text-base text-green-600 font-medium">
              Manage and view all patient records
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer px-5 py-2 bg-green-600 text-white text-base font-medium rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <Plus size={20} />
            <span>New Patient</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-green-50 bg-white">
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              All Patients ({filteredPatients.length})
            </h2>
            {filteredPatients.length > 5 && (
              <button
                onClick={() => setShowAllPatients(!showAllPatients)}
                className="text-green-600 hover:text-green-700 font-bold text-sm md:text-base cursor-pointer"
              >
                {showAllPatients ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            {displayedPatients.map((patient) => (
              <div
                key={patient.id}
                className="border-b border-green-50 p-4 hover:bg-green-50/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-slate-800">{patient.name}</h3>
                    <p className="text-sm text-slate-500">{patient.id}</p>
                  </div>
                </div>
                <div className="space-y-1 mb-3 text-sm">
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-400">Age:</span>{" "}
                    {patient.age}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-400">
                      Gender:
                    </span>{" "}
                    {patient.gender}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-400">Phone:</span>{" "}
                    {patient.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewPatient(patient)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-bold text-sm cursor-pointer"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50/50 border-b border-green-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-50">
                {displayedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-green-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-slate-700">
                        {patient.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {patient.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-bold text-sm border border-purple-100 cursor-pointer"
                        >
                          <Eye size={16} />
                          View
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
              <p className="text-slate-400 italic">
                No patients found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onPatientAdded={fetchPatients}
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
