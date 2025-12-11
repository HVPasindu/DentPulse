import React from "react";
import { useState } from "react";

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
    name: "Address",
    type: "text",
  },
];
export const PopupForm = () => {
  const [Isopen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <h1 className="text-cyan-800 text-md">Add Family Member</h1>
        <h1 className="text-cyan-500 text-sm">
          Add a family member to manage their appointments
        </h1>
        <form>
          {inputs.map((input) => (
            <div className="p-8">
              {input.type === "select" ? (
                <>
                  <div className="p-3">
                    <label>{input.name} </label>
                    <select className="border-2 border-cyan-500 rounded-md p-1">
                      <option selected>Select A Relationship</option>
                      {input.options.map((option, index) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div className="">
                  <label className="p-2">{input.name}</label>
                  <input
                    type={input.type}
                    className="border-2 border-cyan-500  rounded-md p-1"
                  />
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
