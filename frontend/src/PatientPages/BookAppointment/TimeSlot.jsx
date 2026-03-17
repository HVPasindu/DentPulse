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
//       <div className="border-2 border-green-400 m-4 w-full p-4 rounded-2xl bg-white">
//         <div className="flex flex-col pb-4">
//           <h1 className="p-1.5 text-green-700 text-lg">
//             Select Time Slot
//           </h1>
//           <h1 className="p-1.5 text-green-400 text-sm">
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
//           <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
//             <p className="text-sm text-gray-600">Selected Time:</p>
//             <p className="text-lg font-semibold text-green-700">{selectTime}</p>
//           </div>
//         )}
//         <div className="flex justify-center items-center p-6">
//           <button
//             className={`w-[90%] rounded-2xl p-3 text-white font-semibold transition-colors ${
//               selectedPatient && selectDate && selectTime
//                 ? "bg-green-600 hover:bg-green-800 cursor-pointer"
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
import { ClockCheck } from "lucide-react";

export const TimeSlot = ({
  selectTime,
  setTime,
  bookAppointment,
  selectedPatient,
  selectDate,
  bookedTimes,
  isBooking,
  aiSlots,
}) => {
    const getBusyLevel = (time) => {
    const slot = aiSlots.find((s) => s.time === time);
    return slot ? slot.busyLevel : null;
  };
  // const timedata = [
  //   '09:00', '10:00', '11:00', '12:00',
  //   '13:00', '14:00', '15:00', '16:00', '17:00'
  // ];
  // 🔹 Generate 30-minute time slots
  const generateTimeSlots = (startHour, startMin, endHour, endMin) => {
    const slots = [];
    let h = startHour;
    let m = startMin;

    while (h < endHour || (h === endHour && m <= endMin)) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

      m += 30;
      if (m === 60) {
        m = 0;
        h++;
      }
    }

    return slots;
  };

  // 🔹 Decide weekday / weekend slots
  let timedata = [];

  if (selectDate) {
    const day = selectDate.getDay(); // 0=Sun, 6=Sat

    if (day === 0 || day === 6) {
      // ✅ Weekend → 10:30 to 16:30
      timedata = generateTimeSlots(10, 30, 16, 30);
    } else {
      // ✅ Weekday → 16:00 to 19:30
      timedata = generateTimeSlots(16, 0, 19, 30);
    }
  }

  console.log("TimeSlot - Booked times:", bookedTimes);

  return (
    <div>
      <div className="border border-green-300 shadow-lg m-4 w-full p-4 rounded-2xl bg-white relative">


        {/* [NEW] top-right legend box */}
        <div className="mt-3 sm:absolute sm:top-4 sm:right-4">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 shadow-md">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Slot Guide
            </p>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-sm bg-green-200 border border-green-500 inline-block"></span>
              <span className="text-xs text-gray-700">Most optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-white border-2 border-red-500 inline-block"></span>
              <span className="text-xs text-gray-700">May be busy</span>
            </div>
          </div>
        </div>

       <div className="flex flex-col pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div>
              <ClockCheck />
            </div>
            <div>
              <h1 className="p-1.5 text-green-700   text-lg">
                Select Time Slot
              </h1>
            </div>
          </div>

          <h1 className="p-1.5 text-green-500 text-md">
            {selectDate
              ? `Available slots for ${
                  selectDate.toDateString
                    ? selectDate.toDateString()
                    : selectDate
                }`
              : "Please select a date first"}
          </h1>

        </div>

        {/* Display all time slots with booked ones disabled and styled */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
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
                aiBusyLevel={getBusyLevel(data)}
              />
            );
          })}
        </div>

        {selectTime && (
          <div className="mt-4 p-2 bg-green-50 rounded-lg text-center">
            <div></div>
            <p className="text-xs text-gray-600">Selected Time:</p>
           <p className="text-sm sm:text-base font-semibold text-green-700">{selectTime}</p>
          </div>
        )}

        <div className="flex justify-center items-center p-6">
          <button
            className={`w-full sm:w-[60%] rounded-2xl p-2.5 text-white font-semibold transition-colors ${
              selectedPatient && selectDate && selectTime && !isBooking
                ? "bg-green-600 hover:bg-green-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={bookAppointment}
            disabled={
              !selectedPatient || !selectDate || !selectTime || isBooking
            }
          >
            {isBooking ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
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
