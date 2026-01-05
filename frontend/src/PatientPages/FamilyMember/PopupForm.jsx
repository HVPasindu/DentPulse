import React from "react";
import { X } from "lucide-react";

const inputs = [
  {
    id: "1",
    name: "Patient Name",
    label: "name",
    type: "text",
  },
  {
    id: "2",
    name: "Relationship",
    type: "select",
    label: "relationship",
    options: ["Father", "Mother", "Spouse", "Son", "Daughter", "Other"],
  },
  {
    id: "3",
    name: "Phone Number",
    label: "phone",
    type: "tel",
  },
  {
    id: "4",
    name: "Email Address",
    label: "email",
    type: "email",
  },
  {
    id: "5",
    name: "Gender",
    type: "radio",
    label: "gender",
    options: ["Male", "Female"],
  },
  {
    id: "6",
    name: "Date Of Birth",
    label: "date",
    type: "date",
  },
  {
    id: "7",
    name: "Address",
    label: "address",
    type: "text",
  },
];

export const PopupForm = ({
  closeModal,
  handleChange,
  handleSubmit,
  formData,
  isEditMode = false,
  editId = null,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-cyan-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pl-9 py-2">
          <div className="flex items-start justify-between px-6 py-4 ">
            <div>
              <h1 className="text-cyan-800 text-md">
                {isEditMode ? "Update Family Member " : "Add Family Member "}
                <br />
                <span className="text-cyan-400">
                  {isEditMode
                    ? " Update family member to manage their appointments"
                    : " Add a family member to manage their appointments"}
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

          <div className=" justify-center items-center mx-auto">
            <div>
              {inputs.map((input) => (
                <div className="flex flex-col gap-1" key={input.id}>
                  {input.type === "select" ? (
                    <div className="p-2">
                      <label className="font-medium text-cyan-700 py-2.5">
                        {input.name}
                      </label>
                      <br />
                      <select
                        className="border-1 border-cyan-300 rounded-lg p-3"
                        onChange={handleChange}
                        name={input.label}
                        value={formData[input.label] || ""}
                      >
                        <option value="">Select A Relationship</option>
                        {input.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : input.type === "radio" ? (
                    <div className="">
                      <label className="font-medium text-cyan-700 py-2.5">
                        {input.name}
                      </label>
                      <br />
                      <div className="flex gap-6 pt-1">
                        {input.options.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={input.label}
                              value={option}
                              checked={formData[input.label] === option}
                              onChange={handleChange}
                              className="w-4 h-4 text-cyan-500 border-cyan-500 focus:ring-cyan-500"
                            />
                            <span className="text-cyan-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <label className=" font-medium text-cyan-700 py-1.5">
                        {input.name}
                      </label>
                      <br />
                      <input
                        type={input.type}
                        className="border border-cyan-300 rounded-xl px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder={input.name}
                        onChange={handleChange}
                        name={input.label}
                        value={formData[input.label] || ""}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 px-6 py-4 ">
                <button
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
                  onClick={handleSubmit}
                  type="button"
                >
                  {isEditMode ? "Update Details" : "Add Details"}
                </button>
                <button
                  className="p-1.5 hover:bg-gray-300 border-2 border-gray-100 rounded-2xl w-40"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};