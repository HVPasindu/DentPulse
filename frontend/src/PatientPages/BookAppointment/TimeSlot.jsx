import React from "react";
import { timedata } from "../data/timedata";
import { TimeCardComponent } from "./TimeCardComponent";
export const TimeSlot = () => {
  return (
    <div>
      <div
        className="border-2 border-cyan-400 m-4 gap-x-3 w-full p-4 rounded-2xl bg-white
         "
      >
        <div className="flex flex-col pb-4">
          <h1 className="p-1.5 text-cyan-700">Select Time Slot</h1>
          <h1 className="p-1.5 text-cyan-400">
            {/* Available slots for {selected_date.toDateString()} */}
            Available slots for 
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
  );
};
