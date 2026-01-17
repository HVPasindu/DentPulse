

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export const AppointmentDate = ({ selectDate, setDate, selectedPatient }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white border border-green-300 rounded-2xl shadow-lg p-6 w-full">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="size-6 text-green-700" />
            <h2 className="text-4xl font-serif font-stretch-105% text-green-700 ">Set Appointment Date</h2>
          </div>
          <p className="text-green-500 text-2xl">
            Choose a date for your appointment
          </p>
        </div>
        <div className="flex justify-center">
          <DatePicker
            selected={selectDate}
            onChange={(d) => {
              const event = {
                target: {
                  value: d,
                },
              };
              setDate(event);
            }}
            inline
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            calendarClassName="custom-calendar"
            disabled={!selectedPatient}
          />
        </div>
        {!selectedPatient && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
            <p className="text-sm text-yellow-700">Please select a patient first</p>
          </div>
        )}
        {selectDate && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
            <p className="text-lg text-gray-600">Selected Date:</p>
            <p className="text-xl font-semibold text-green-700">
              {selectDate.toDateString ? selectDate.toDateString() : selectDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
