import React from "react";
import { paitentdata } from "./data/paitentdata";
import PaitentDetailCardComponent from "./PaitentDetailCardComponent";
import { UserRoundPen } from "lucide-react";
export const PatientDetail = () => {
  return (
    <div className="bg-white border-2 border-cyan-400 rounded-2xl p-8  ">
      <div>
        <div className="flex flex-row">
          <div>
            <UserRoundPen />
          </div>
          <h1 className="p-1.5 text-cyan-700"> Paitent Details</h1>
        </div>

        <h1 className="p-1.5 text-cyan-400">
          Update your personal information
        </h1>
      </div>
      {paitentdata.map((data) => (
        <PaitentDetailCardComponent type={data.type} name={data.name} />
      ))}

      <div className="flex justify-center">
        <button className="p-2 w-[90%] text-white bg-cyan-600 hover:bg-cyan-800 rounded-2xl">
          Update Details
        </button>
      </div>
    </div>
  );
};
