import React, { useState } from "react";
import { X } from "lucide-react";

const inputs = [
  { id: "1", name: "Patient Name", label: "name", type: "text" },
  {
    id: "2",
    name: "Relationship",
    type: "select",
    label: "relationship",
    options: [
      "Father",
      "Mother",
      "Spouse",
      "Son",
      "Daughter",
      "Other",
      "Child",
      "Parent",
      "Sibling",
    ],
  },
  { id: "3", name: "Phone Number", label: "phone", type: "tel" },
  { id: "4", name: "Email Address", label: "email", type: "email" },
  {
    id: "5",
    name: "Gender",
    type: "radio",
    label: "gender",
    options: ["Male", "Female"],
  },
  { id: "6", name: "Date Of Birth", label: "date", type: "date" },
  { id: "7", name: "Address", label: "address", type: "text" },
];

export const PopupForm = ({
  closeModal,
  handleChange,
  handleSubmit,
  formData,
  isEditMode = false,
}) => {
  /* helpers */
  const getValue = (label) => {
    const v = formData?.[label];
    if (label === "date" && typeof v === "string" && v.includes("T")) {
      return v.slice(0, 10);
    }
    return v ?? "";
  };

  const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

  /* validation */
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e = {};
    if (!formData.name?.trim()) e.name = "Patient name is required";
    if (!formData.relationship) e.relationship = "Relationship is required";
    if (!formData.phone) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      e.phone = "Phone number must be 10 digits";
    if (!formData.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email address";
    if (!formData.gender) e.gender = "Gender is required";
    if (!formData.date) e.date = "Date of birth is required";
    if (!formData.address?.trim()) e.address = "Address is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChangeWithValidation = (e) => {
    handleChange(e);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-cyan-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-6 py-4">
          <h1 className="text-cyan-800 text-md">
            {isEditMode ? "Update Family Member" : "Add Family Member"}
            <br />
            <span className="text-cyan-400 text-sm">
              {isEditMode
                ? "Update family member to manage appointments"
                : "Add a family member to manage appointments"}
            </span>
          </h1>
          <X
            className="cursor-pointer hover:text-cyan-600"
            onClick={closeModal}
          />
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-3">
          {inputs.map((input) => {
            const currentValue = getValue(input.label);

            return (
              <div key={input.id}>
                <label className="block text-sm font-medium text-cyan-700 mb-1">
                  {input.name}
                </label>

                {input.type === "select" ? (
                  <select
                    name={input.label}
                    value={currentValue}
                    onChange={handleChangeWithValidation}
                    className="w-full border border-cyan-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select A Relationship</option>
                    {input.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : input.type === "radio" ? (
                  <div className="flex gap-4">
                    {input.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={input.label}
                          value={opt}
                          checked={
                            normalize(currentValue) === normalize(opt)
                          }
                          onChange={handleChangeWithValidation}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={input.type}
                    name={input.label}
                    value={currentValue}
                    onChange={handleChangeWithValidation}
                    max={input.type === "date" ? today : undefined}
                    className="w-full border border-cyan-300 rounded-lg px-3 py-2"
                    placeholder={input.name}
                  />
                )}

                {errors[input.label] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[input.label]}
                  </p>
                )}
              </div>
            );
          })}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700"
              type="button"
              onClick={() => validate() && handleSubmit()}
            >
              {isEditMode ? "Update Details" : "Add Details"}
            </button>
            <button
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
