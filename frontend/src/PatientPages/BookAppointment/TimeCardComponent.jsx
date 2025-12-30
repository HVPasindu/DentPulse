import React from "react";
import { Clock } from "lucide-react";

export const TimeCardComponent = ({ data, selectTime, setTime, disabled }) => {
  const isSelected = selectTime === data;

  const handleClick = () => {
    if (!disabled) {
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
            isSelected
              ? "border-cyan-600 bg-cyan-600 text-white"
              : "border-cyan-400 text-cyan-500 bg-white"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:cursor-pointer hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
          }
        `}
      >
        <Clock className="w-4 h-4" />
        <h1 className="font-medium">{data}</h1>
      </div>
    </div>
  );
};