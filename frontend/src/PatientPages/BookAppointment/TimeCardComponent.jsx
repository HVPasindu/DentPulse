// 


import React from "react";
import { Clock } from "lucide-react";

export const TimeCardComponent = ({ data, selectTime, setTime, disabled, isBooked }) => {
  const isSelected = selectTime === data;

  const handleClick = () => {
    // Prevent clicking if disabled or already booked
    if (!disabled && !isBooked) {
      const event = {
        target: {
          value: data,
        },
      };
      setTime(event);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`
          flex justify-center items-center 
          border-2 rounded-lg p-3 gap-2 m-1 
          transition-all duration-200
          ${
            isBooked
              ? "border-red-400 bg-red-100 text-red-500 cursor-not-allowed opacity-60"
              : isSelected
              ? "border-cyan-600 bg-cyan-600 text-white"
              : "border-cyan-400 text-cyan-500 bg-white"
          }
          ${
            !isBooked && !disabled
              ? "hover:cursor-pointer hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
              : ""
          }
          ${disabled && !isBooked ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <Clock className="w-4 h-4" />
        <h1 className="font-medium">{data}</h1>
        {isBooked && <span className="text-xs ml-1">(Booked)</span>}
      </div>
    </div>
  );
};