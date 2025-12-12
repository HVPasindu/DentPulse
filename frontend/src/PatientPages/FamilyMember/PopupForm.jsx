import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
const inputs = [
  {
    id: "1",
    name: "Patient Name",
    type: "text",
  },
  {
    id: "2",
    name: "Relationship",
    type: "select",
    options: ["Father", "Mother", "Spouse", "Son", "Daughter", "Other"],
  },
  {
    id: "3",
    name: "Phone Number",
    type: "tel",
  },
  {
    id: "4",
    name: "Email Address",
    type: "email",
  },
  {
    id: "5",
    name: "Date Of Birth",
    type: "date",
  },
  {
    id: "6",
    name: "Address",
    type: "text",
  },
];
export const PopupForm = ({closeModal,handleChange}) => {
  return (
    <div className=" bg-white  border-2 border-cyan-400 rounded-lg w-[25%]">
      <div className="pl-9 py-2 ">
        <div className="flex flex-row justify-evenly items-center">
          <div>
            <h1 className="text-cyan-800 text-md">
              Add Family Member
              <br />
              <span className="text-cyan-400">
                Add a family member to manage their appointments
              </span>
            </h1>
          </div>
          <div>
            <X className="cursor-pointer hover:text-cyan-600" onClick={closeModal}/>
          </div>
        </div>

        <div className="flex flex-col pl-5">
          <form>
            {inputs.map((input) => (
              <div className="p-2.5">
                {input.type === "select" ? (
                  <>
                    <div className="p-2">
                      <label className="font-medium text-cyan-700 py-2.5">
                        {input.name}{" "}
                      </label>
                      <br />
                      <select className="border-2 border-cyan-500 rounded-md p-1">
                        <option selected className="border-2 border-cyan-400">
                          {" "}
                          Select A Relationship{" "}
                        </option>
                        {input.options.map((option, index) => (
                          <option
                            key={option}
                            value={option}
                            className="border-2 border-cyan-400"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="">
                    <label
                      className="p-2 font-medium text-cyan-700 py-1.5
                  "
                    >
                      {input.name}
                    </label>
                    <br />
                    <input
                      type={input.type}
                      className="border-2 border-cyan-500  rounded-md p-1  "
                      placeholder={input.name}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="py-2.5 flex flex-row ">
              <button className=" p-2.5 text-white bg-cyan-500 hover:bg-cyan-700 rounded-2xl w-50 " onClick={handleChange}>
                Add Family Member
              </button>
              <button className="p-2.5 hover:bg-gray-300  border-2 border-gray-100 rounded-2xl w-40" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
