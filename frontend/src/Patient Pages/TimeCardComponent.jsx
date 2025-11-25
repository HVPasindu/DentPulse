import React from "react";

export const TimeCardComponent = (props) => {
  return (
    <div>
      <div
        className="hover:cursor-pointer flex justify-center 
      items-center border-2 text-cyan-500 border-cyan-400 rounded-lg p-2 gap-4 m-1 hover:bg-cyan-600 hover:text-black"
      >
        <h1 className="">{props.date}</h1>
      </div>
    </div>
  );
};
