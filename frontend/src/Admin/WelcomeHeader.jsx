import React from 'react';

const WelcomeHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 mt-1">Manage your dental appointments efficiently</p>
      </div>
      <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
        + New Appointment
      </button>
    </div>
  );
};

export default WelcomeHeader;