import React from "react";

export const SelectPatient = () => {




  return (

    <div className="pl-10">

      <div className="rounded-2xl  border-2 border-cyan-500 h-full p-4">
        <div className="p-4">
          <h1 className="text-cyan-700 text-sm">
            Select Patient
            <br />
            <span className="text-cyan-300 text-sm">
              Choose who this appointment is for
            </span>
          </h1>
        </div>

        <div className="p-4">
          <h1 className="text-sm text-cyan-600">Paitent</h1>
          <select
            name="
            "
            id=""
            className="border-2  border-cyan-500 rounded-lg w-full"
          >
        
            <option value="" className="text-cyan-500">Select A Paitent</option>
            <option value="" className="text-cyan-500">Kalana</option>
            <option value="" className="text-cyan-500">Sahan</option>
            <option value="" className="text-cyan-500">Vishara</option>
            <option value="" className="text-cyan-500">naveesha</option>
          </select>
        </div>
      </div>
    </div>
  );
};
