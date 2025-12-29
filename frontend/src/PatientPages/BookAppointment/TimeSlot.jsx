import React from "react";
import { timedata } from "../data/timedata";
import { TimeCardComponent } from "./TimeCardComponent";

export const TimeSlot = ({
  selectTime,
  setTime,
  bookAppointment,
  selectedPatient,
  selectDate,
}) => {
  return (
    <div>
      <div className="border-2 border-cyan-400 m-4 w-full p-4 rounded-2xl bg-white">
        <div className="flex flex-col pb-4">
          <h1 className="p-1.5 text-cyan-700 text-lg">
            Select Time Slot
          </h1>
          <h1 className="p-1.5 text-cyan-400 text-sm">
            {selectDate
              ? `Available slots for ${
                  selectDate.toDateString
                    ? selectDate.toDateString()
                    : selectDate
                }`
              : "Please select a date first"}
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timedata.map((data, index) => (
            <TimeCardComponent
              key={index}
              data={data}
              selectTime={selectTime}
              setTime={setTime}
              disabled={!selectedPatient || !selectDate}
            />
          ))}
        </div>
        {selectTime && (
          <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Selected Time:</p>
            <p className="text-lg font-semibold text-cyan-700">{selectTime}</p>
          </div>
        )}
        <div className="flex justify-center items-center p-6">
          <button
            className={`w-[90%] rounded-2xl p-3 text-white font-semibold transition-colors ${
              selectedPatient && selectDate && selectTime
                ? "bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={bookAppointment}
            disabled={!selectedPatient || !selectDate || !selectTime}
          >
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
};