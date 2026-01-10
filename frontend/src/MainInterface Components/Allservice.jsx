import React from "react";
import { servicesData } from "../data/servicedata";
import { Services } from "./ServicesCard";
export const Allservice = () => {
  return (
    <div>
      <div className="items-center justify-center text-center overflow-x-hidden">
        <div className="bg-green-50 mt-10 p-10 ">
          <h1 className="text-4xl font-bold text-green-800 pb-4">
            Our Services
          </h1>
          <p className="text-xl font-medium text-green-500">
            Comprehensive dental care tailored to all your needs
          </p>
        </div>
      </div>

      <div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 py-5 pb-28 bg-green-50 mx-auto"
          id="services"
        >
          {servicesData.map((service) => (
            <Services title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </div>
  );
};
