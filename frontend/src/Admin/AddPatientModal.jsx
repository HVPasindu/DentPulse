import { useState } from 'react';
import { X } from 'lucide-react';

const AddPatientModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    lastVisit: new Date().toISOString().split('T')[0],
    treatments: [], // Array to store multiple treatments
  });

  const [newTreatment, setNewTreatment] = useState({ procedure: '', date: '', cost: '' });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle treatment input change
  const handleTreatmentChange = (e) => {
    setNewTreatment({
      ...newTreatment,
      [e.target.name]: e.target.value,
    });
  };

  // Add a treatment to the treatments array
  const addTreatment = () => {
    if (newTreatment.procedure && newTreatment.date && newTreatment.cost) {
      setFormData({
        ...formData,
        treatments: [
          ...formData.treatments,
          { ...newTreatment, cost: parseFloat(newTreatment.cost), id: Date.now() },
        ],
      });
      setNewTreatment({ procedure: '', date: '', cost: '' });
    }
  };

  // Submit patient form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: calculate age from DOB if needed
    if (formData.dob && !formData.age) {
      const birthDate = new Date(formData.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      formData.age = age;
    }
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-cyan-500 border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white">Add New Patient</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Street address, City, State"
            />
          </div>

          {/* Last Visit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Visit Date *</label>
            <input
              type="date"
              name="lastVisit"
              value={formData.lastVisit}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Past Treatments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Past Treatment</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                name="procedure"
                value={newTreatment.procedure}
                onChange={handleTreatmentChange}
                placeholder="Procedure"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={newTreatment.date}
                onChange={handleTreatmentChange}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                name="cost"
                value={newTreatment.cost}
                onChange={handleTreatmentChange}
                placeholder="Cost"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={addTreatment}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            {/* List of added treatments */}
            {formData.treatments.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {formData.treatments.map((t) => (
                  <li key={t.id}>
                    {t.procedure} | {t.date} | ${t.cost}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
