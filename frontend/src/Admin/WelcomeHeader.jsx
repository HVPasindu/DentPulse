import React from 'react';

const WelcomeHeader = ({ onAddNew, onAddSpecial }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
        <p className="text-gray-500 mt-1">Manage your dental appointments efficiently</p>
      </div>
      {/* Added a div container with gap-3 to separate the buttons */}
      <div className="flex gap-3">
        <button 
          onClick={onAddNew} 
          className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition shadow-sm"
        >
          + Regular Appointment
        </button>
        <button 
          onClick={onAddSpecial} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          + Special Appointment
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;