import React from "react";

const WelcomeHeader = ({ onAddNew, onAddSpecial }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-green-700">
          Appointment Management
        </h1>
        <p className="mt-2 text-sm text-green-600 font-medium sm:text-base">
          Manage dental appointments efficiently
        </p>
      </div>
     
      <div className="flex gap-3">
        <button
          onClick={onAddNew}
          className="cursor-pointer px-5 py-2 bg-green-600 text-white text-base font-medium rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          + Regular Appointment
        </button>
        <button
          onClick={onAddSpecial}
          className="cursor-pointer px-5 py-2 bg-green-600 text-white text-base font-medium rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          + Special Appointment
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
