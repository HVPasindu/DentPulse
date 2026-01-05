// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Calendar } from "lucide-react";

// export const AppointmentDate = ({ selectDate, setDate, selectedPatient }) => {
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="bg-white border-2 border-cyan-500 rounded-2xl shadow-lg p-6 w-full">
//         <div className="mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <Calendar className="size-6 text-cyan-700" />
//             <h2 className="text-lg text-cyan-700 ">
//               Set Appointment Date
//             </h2>
//           </div>
//           <p className="text-cyan-400 text-sm">
//             Choose a date for your appointment
//           </p>
//         </div>
//         <div className="flex justify-center">
//           <DatePicker
//             selected={selectDate}
//             onChange={(d) => {
//               const event = {
//                 target: {
//                   value: d,
//                 },
//               };
//               setDate(event);
//             }}
//             inline
//             minDate={new Date()}
//             maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
//             calendarClassName="custom-calendar"
//             disabled={!selectedPatient}
//           />
//         </div>
//         {!selectedPatient && (
//           <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
//             <p className="text-sm text-yellow-700">
//               Please select a patient first
//             </p>
//           </div>
//         )}
//         {selectDate && (
//           <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
//             <p className="text-sm text-gray-600">Selected Date:</p>
//             <p className="text-lg font-semibold text-cyan-700">
//               {selectDate.toDateString ? selectDate.toDateString() : selectDate}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export const AppointmentDate = ({ selectDate, setDate, selectedPatient }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white border-2 border-cyan-500 rounded-2xl shadow-lg p-6 w-full">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="size-6 text-cyan-700" />
            <h2 className="text-lg text-cyan-700 ">Set Appointment Date</h2>
          </div>
          <p className="text-cyan-400 text-sm">
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
          <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Selected Date:</p>
            <p className="text-lg font-semibold text-cyan-700">
              {selectDate.toDateString ? selectDate.toDateString() : selectDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
