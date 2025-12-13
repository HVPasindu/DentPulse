import React from "react";

import { X } from "lucide-react";
const inputs = [

  {
    id: "1",
    name: "Patient Name",
    label: "name",
    value:"",
    type: "text",
  },
  {
    id: "2",
    name: "Relationship",
    type: "select",
    label: "relationship",
    value: "",
    options: ["Father", "Mother", "Spouse", "Son", "Daughter", "Other"],
  },
  {
    id: "3",
    name: "Phone Number",
    label: "phone",
    value: "",
    type: "tel",
  },
  {
    id: "4",
    name: "Email Address",
    label: "email",
    value: "",
    type: "email",
  },
  {
    id: "5",
    name: "Date Of Birth",
    label: "date",
    value: "",
    type: "date",
  },
  {
    id: "6",
    name: "Address",
    label: "address",
    value: "",
    type: "text",
  },

];
export const PopupForm = ({ closeModal, handleChange, handleSubmit }) => {
  return (
    <div className="fixed inset-0  bg-opacity-10 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
 >
    <div className=" bg-white  border-2 border-cyan-400 rounded-lg w-[25%] shadow-2xl" onClick={(e)=>e.stopPropagation()}>
      <div className="pl-9 py-2 ">
        <div className="flex flex-row justify-evenly items-center pt-4">
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
            <X
              className="cursor-pointer hover:text-cyan-600"
              onClick={closeModal}
            />
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
                            onChange={handleChange}
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
                      className="border-2 border-cyan-500  w-[95%]   rounded-md p-0.5  "
                      placeholder={input.name}
                      onChange={handleChange}
                      value={""}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="py-2.5 flex flex-row ">
              <button
                className=" p-1.5 text-white bg-cyan-500 hover:bg-cyan-700 rounded-2xl w-50 "
                onClick={handleSubmit}
              >
                Add Family Member
              </button>
              <button
                className="p-1.5 hover:bg-gray-300  border-2 border-gray-100 rounded-2xl w-40"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};
