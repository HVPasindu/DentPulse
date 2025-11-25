import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimeCardComponent } from "./TimeCardComponent";
import { timedata } from "./data/timedata";
// import { newDate } from "react-datepicker/dist/date_utils";

export const AppointmentDate = () => {
  const [date, setDate] = useState(new Date());

  let selected_date = date;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white border-2 border-cyan-500 rounded-2xl flex flex-col justify-center items-center max-w-fit">
          <div className="p-10">
            <div className="py-4">
              <h1 className="p-1.5 text-cyan-700">Set Appointment Date</h1>
              <h1 className="p-1.5 text-cyan-400">Choose a date for your appointment</h1>
            </div>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              inline
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            />
          </div>
        </div>
        <div className="border-2 border-cyan-400 m-4 gap-x-3 w-2xl p-4 rounded-2xl ">
          <div className="flex flex-col pb-4">
            <h1 className="p-1.5 text-cyan-700">Select Time Slot</h1>
            <h1 className="p-1.5 text-cyan-400">
              Available slots for {selected_date.toDateString()}
            </h1>
          </div>
          <div className="grid  grid-cols-3 ">
            {timedata.map((data) => (
              <TimeCardComponent date={data} />
            ))}
          </div>

          <div className="flex justify-center items-center p-6">
            <button className="w-[90%] rounded-2xl p-2 text-white bg-cyan-600 hover:bg-cyan-800 ">
              Book An Appoinment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
