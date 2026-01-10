import React from "react";
import { CircleCheckBig } from "lucide-react";
export const Features = () => {
  return (
    <div className="">
      {" "}
      <div className="bg-linear-to-r from-green-500 via-green-600 to-green-700 text-xl px-4 py-20 text-white font-bold grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="flex gap-2">
          <CircleCheckBig /> Experienced Dentists
        </div>
        <div className="flex gap-2">
          <CircleCheckBig /> Modern Equipment
        </div>
        <div className="flex gap-2">
          <CircleCheckBig /> Flexible Payments
        </div>
        <div className="flex gap-2">
          <CircleCheckBig /> Same-Day Appointments
        </div>
        <div className="flex gap-2">
          <CircleCheckBig /> Family Friendly
        </div>
        <div className="flex gap-2">
          <CircleCheckBig /> Digital X-Rays
        </div>
      </div>
    </div>
  );
};
