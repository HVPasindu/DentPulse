import React from "react";

export const TimeCardComponent = (props) => {

  return <div>

    <div className="hover:cursor-pointer flex justify-center  rounded-2xl items-center border-2 border-cyan-400 rounded-lg p-2 gap-4 m-1 hover:bg-cyan-700 ">

        <h1 className="text-cyan-500">{props.date}</h1>

    </div>

  </div>;
};
