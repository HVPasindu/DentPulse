import React from "react";
import { Calendar,User,Users,Clock } from "lucide-react";

export const NavigationButtons = () => {
  return (
    

    <div className="bg-cyan-100 rounded-2xl grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-10">
      <button className="bg-cyan-500 hover:bg-cyan-700 rounded-lg text-white p-2">
        <div className="size-0.5">
            <User />
        </div>
        My Profile
      </button>
      <button className="bg-cyan-500 hover:bg-cyan-700 rounded-lg text-white p-2 ">
        <div className="size-0.5">
            <Users />
        </div>
        Family Members
      </button>
      <button className="bg-cyan-500 hover:bg-cyan-700 rounded-lg text-white p-2">
        <div className=" size-0.5">
          <Calendar />
        </div>
        Book Appointment
      </button>
      <button className="bg-cyan-500 hover:bg-cyan-700 rounded-lg text-white p-2 ">
        <div className="size-0.5">
            <Clock />
        </div>
        My Appointment
      </button>
    </div>
  );
};
