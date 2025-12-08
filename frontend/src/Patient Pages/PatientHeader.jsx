import React from "react";
import headerLogo from "../assets/headerLogo.png";
import { LogOut } from "lucide-react";


const PatientHeader = () => {
  return (
    <div className="flex flex-row w-screen justify-between bg-cyan-200 p-4">
      <div className="bg-cyan-200 flex flex-row p-2">
        <img src={headerLogo} alt="dental logo" className="size-10" />

        <h1 className="text-cyan-400 text-2xl font-bold">
          <span className="text-cyan-600">Dent</span>Pluse
        </h1>
      </div>

      <div className=" flex flex-row">
        <h1 className="text-black p-4">Hello Patient!</h1>

        <button className="bg-white  hover:bg-cyan-100 border-2  hover:border-2 border-cyan-400 px-3 rounded-2xl ">
          <div className="flex p-0.5">
            <div className=" pr-3">
              <LogOut className="size-5" />
            </div>
            <div>
              <h1>Logout</h1>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;
