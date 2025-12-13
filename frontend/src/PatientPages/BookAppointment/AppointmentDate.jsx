import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimeCardComponent } from "./TimeCardComponent";

// import { newDate } from "react-datepicker/dist/date_utils";

export const AppointmentDate = () => {
  const [date, setDate] = useState(new Date());


  let selected_date = date;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white border-2 border-cyan-500 rounded-2xl flex flex-col justify-center items-center w-max-fit">
          <div className="p-10">
            <div className="py-4">
              <h1 className="p-1.5 text-cyan-700">Set Appointment Date</h1>
              <h1 className="p-1.5 text-cyan-400">
                Choose a date for your appointment
              </h1>
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
       
      </div>
    </>
  );
};
