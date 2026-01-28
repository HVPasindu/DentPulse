//

import React from "react";
import { Clock } from "lucide-react";

export const TimeCardComponent = ({
  data,
  selectTime,
  setTime,
  disabled,
  isBooked,
  aiBusyLevel,
}) => {
  const isSelected = selectTime === data;
    const getAiStyle = () => {
    if (aiBusyLevel === "Low Busy")
      return "border-green-500 bg-green-50 text-green-700";
    if (aiBusyLevel === "High Busy")
      return "border-red-500 bg-red-50 text-red-700";
    return "border-gray-400 text-gray-500 bg-white";
  };

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
              ? "border-gray-400 bg-gray-100 text-gray-500 cursor-not-allowed opacity-60"
              : isSelected
              ? "border-gray-600 bg-gray-600 text-white"
              // : "border-gray-400 text-gray-500 bg-white"
              : getAiStyle()
          }
           
          ${
            !isBooked && !disabled
              ? "hover:cursor-pointer  hover:text-black hover:border-black"
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
