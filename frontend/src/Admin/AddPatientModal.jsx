import { useState } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';

const AddPatientModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    hasNIC: '',
    nicNumber: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    Swal.fire({
      title: "Success!",
      text: "Patient added successfully!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#2563eb",
    });
  };

  // Logic to check if patient is under 16 based on DOB
  const isUnder16 = formData.dob 
    ? (new Date().getFullYear() - new Date(formData.dob).getFullYear()) < 16 
    : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Content */}
      <div className="relative z-50 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Add New Patient</h2>
            <p className="mt-1 text-sm text-slate-600">
              Enter the details for the new patient.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter patient name"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-slate-700">Date of Birth *</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address *</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Street address, City, State"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Does patient have NIC */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Does patient have NIC? *</label>
            <div className="flex gap-6">
              <div className="flex items-center">
                <input
                  id="hasNIC-yes"
                  type="radio"
                  name="hasNIC"
                  value="yes"
                  checked={formData.hasNIC === 'yes'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="hasNIC-yes" className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  id="hasNIC-no"
                  type="radio"
                  name="hasNIC"
                  value="no"
                  checked={formData.hasNIC === 'no'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="hasNIC-no" className="ml-2 text-sm font-medium text-slate-700 cursor-pointer">No</label>
              </div>
            </div>
          </div>

          {/* NIC Number - Show only if hasNIC is 'yes' */}
          {formData.hasNIC === 'yes' && (
            <div>
              <label htmlFor="nicNumber" className="block text-sm font-medium text-slate-700">
                NIC Number * {isUnder16 && <span className="text-xs text-red-500 font-normal ml-2">(Disabled: Patient under 16)</span>}
              </label>
              <input
                id="nicNumber"
                type="text"
                name="nicNumber"
                value={formData.nicNumber}
                onChange={handleChange}
                disabled={isUnder16}
                required={formData.hasNIC === 'yes' && !isUnder16}
                placeholder={isUnder16 ? "Not applicable for under 16" : "Enter NIC number"}
                className={`mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 
                  ${isUnder16 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
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