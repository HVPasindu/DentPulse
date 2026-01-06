// import React from "react";
// import { timedata } from "../data/timedata";
// import { TimeCardComponent } from "./TimeCardComponent";

// export const TimeSlot = ({
//   selectTime,
//   setTime,
//   bookAppointment,
//   selectedPatient,
//   selectDate,
// }) => {
//   return (
//     <div>
//       <div className="border-2 border-cyan-400 m-4 w-full p-4 rounded-2xl bg-white">
//         <div className="flex flex-col pb-4">
//           <h1 className="p-1.5 text-cyan-700 text-lg">
//             Select Time Slot
//           </h1>
//           <h1 className="p-1.5 text-cyan-400 text-sm">
//             {selectDate
//               ? `Available slots for ${
//                   selectDate.toDateString
//                     ? selectDate.toDateString()
//                     : selectDate
//                 }`
//               : "Please select a date first"}
//           </h1>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {timedata.map((data, index) => (
//             <TimeCardComponent
//               key={index}
//               data={data}
//               selectTime={selectTime}
//               setTime={setTime}
//               disabled={!selectedPatient || !selectDate}
//             />
//           ))}
//         </div>
//         {selectTime && (
//           <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
//             <p className="text-sm text-gray-600">Selected Time:</p>
//             <p className="text-lg font-semibold text-cyan-700">{selectTime}</p>
//           </div>
//         )}
//         <div className="flex justify-center items-center p-6">
//           <button
//             className={`w-[90%] rounded-2xl p-3 text-white font-semibold transition-colors ${
//               selectedPatient && selectDate && selectTime
//                 ? "bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//             onClick={bookAppointment}
//             disabled={!selectedPatient || !selectDate || !selectTime}
//           >
//             Book An Appointment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from "react";
import { TimeCardComponent } from "./TimeCardComponent";

export const TimeSlot = ({
  selectTime,
  setTime,
  bookAppointment,
  selectedPatient,
  selectDate,
  bookedTimes,
  isBooking,
}) => {
  const timedata = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  console.log("TimeSlot - Booked times:", bookedTimes);

  return (
    <div>
      <div className="border border-cyan-300 shadow-lg m-4 w-full p-4 rounded-2xl bg-white">
        <div className="flex flex-col pb-4">
          <h1 className="p-1.5 text-cyan-700 text-lg">
            Select Time Slot
          </h1>
          <h1 className="p-1.5 text-cyan-400 text-sm">
            {selectDate
              ? `Available slots for ${
                  selectDate.toDateString ? selectDate.toDateString() : selectDate
                }`
              : "Please select a date first"}
          </h1>
        </div>

        {/* Display all time slots with booked ones disabled and styled */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timedata.map((data, index) => {
            const isThisBooked = bookedTimes.includes(data);
            
            return (
              <TimeCardComponent
                key={index}
                data={data}
                selectTime={selectTime}
                setTime={setTime}
                disabled={!selectedPatient || !selectDate}
                isBooked={isThisBooked}
              />
            );
          })}
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
              selectedPatient && selectDate && selectTime && !isBooking
                ? "bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={bookAppointment}
            disabled={!selectedPatient || !selectDate || !selectTime || isBooking}
          >
            {isBooking ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Booking...
              </span>
            ) : (
              "Book An Appointment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};