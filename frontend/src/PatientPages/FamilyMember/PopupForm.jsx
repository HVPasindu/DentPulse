// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { motion } from "motion/react";

// const inputs = [
//   { id: "1", name: "Patient Name", label: "name", type: "text" },
//   {
//     id: "2",
//     name: "Relationship",
//     type: "select",
//     label: "relationship",
//     options: [
//       "Father",
//       "Mother",
//       "Spouse",
//       "Son",
//       "Daughter",
//       "Other",
//       "Child",
//       "Parent",
//       "Sibling",
//     ],
//   },
//   { id: "3", name: "Phone Number", label: "phone", type: "tel" },
//   { id: "4", name: "Email Address", label: "email", type: "email" },
//   {
//     id: "5",
//     name: "Gender",
//     type: "radio",
//     label: "gender",
//     options: ["Male", "Female"],
//   },
//   {
//     id:6,
//     name:"Nic",
//     type:"radio",
//     label:"nic",
//     options:["With NIC","Without NIC"]
//   },
//   {
//     id:7,
//     name:"NIC",
//     type:"text",
//     label:"nicnumber",

//   },

//   { id: "8", name: "Date Of Birth", label: "date", type: "date" },
//   { id: "9", name: "Address", label: "address", type: "text" },
// ];

// export const PopupForm = ({
//   closeModal,
//   handleChange,
//   handleSubmit,
//   formData,
//   isEditMode = false,
// }) => {
//   /* helpers */
//   const getValue = (label) => {
//     const v = formData?.[label];
//     if (label === "date" && typeof v === "string" && v.includes("T")) {
//       return v.slice(0, 10);
//     }
//     return v ?? "";
//   };

//   const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

//   /* validation */
//   const [errors, setErrors] = useState({});
//   const today = new Date().toISOString().split("T")[0];

//   const validate = () => {
//     const e = {};
//     if (!formData.name?.trim()) e.name = "Patient name is required";
//     if (!formData.relationship) e.relationship = "Relationship is required";
//     if (!formData.phone) e.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(formData.phone))
//       e.phone = "Phone number must be 10 digits";
//     if (!formData.email) e.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       e.email = "Invalid email address";
//     if (!formData.gender) e.gender = "Gender is required";
//     if (!formData.date) e.date = "Date of birth is required";
//     if (!formData.address?.trim()) e.address = "Address is required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleChangeWithValidation = (e) => {
//     handleChange(e);
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
//       onClick={closeModal}
//     >
//       <div
//         className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-green-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-start px-6 py-4">
//           <h1 className="text-green-800 text-3xl font-serif font-stretch-105%">
//             {isEditMode ? "Update Family Member" : "Add Family Member"}
//             <br />
//             <span className="text-green-400 text-xl">
//               {isEditMode
//                 ? "Update family member to manage appointments"
//                 : "Add a family member to manage appointments"}
//             </span>
//           </h1>
//           <X
//             className="cursor-pointer hover:text-green-600"
//             onClick={closeModal}
//           />
//         </div>

//         {/* Form */}
//         <div className="px-6 pb-6 space-y-3">
//           {inputs.map((input) => {
//             const currentValue = getValue(input.label);

//             return (
//               <div key={input.id}>
//                 <label className="block text-lg font-semibold text-green-700 mb-1">
//                   {input.name}
//                 </label>

//                 {input.type === "select" ? (
//                   <select
//                     name={input.label}
//                     value={currentValue}
//                     onChange={handleChangeWithValidation}
//                     className="w-full border border-green-300 rounded-lg px-3 py-2"
//                   >
//                     <option value="">Select A Relationship</option>
//                     {input.options.map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 ) : input.type === "radio" ? (
//                   <div className="flex gap-4">
//                     {input.options.map((opt) => (
//                       <label key={opt} className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name={input.label}
//                           value={opt}
//                           checked={normalize(currentValue) === normalize(opt)}
//                           onChange={handleChangeWithValidation}
//                         />
//                         {opt}
//                       </label>
//                     ))}
//                   </div>
//                 ) : (
//                   <input
//                     type={input.type}
//                     name={input.label}
//                     value={currentValue}
//                     onChange={handleChangeWithValidation}
//                     max={input.type === "date" ? today : undefined}
//                     className="w-full border border-green-300 rounded-lg px-3 py-2"
//                     placeholder={input.name}
//                   />
//                 )}

//                 {errors[input.label] && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors[input.label]}
//                   </p>
//                 )}
//               </div>
//             );
//           })}

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-4">
//             <motion.button
//               type="button"
//               onClick={() => validate() && handleSubmit()}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.96 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
//             >
//               {isEditMode ? "Update Details" : "Add Details"}
//             </motion.button>

//             <motion.button
//               type="button"
//               onClick={closeModal}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               transition={{ type: "spring", stiffness: 250, damping: 22 }}
//               className="px-4 py-2 border rounded-xl hover:bg-gray-100"
//             >
//               Cancel
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

/* ---------------- INPUT CONFIG (UNCHANGED) ---------------- */
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
  {
    id: 6,
    name: "NIC",
    type: "radio",
    label: "nic",
    options: ["With NIC", "Without NIC"],
  },
  {
    id: 7,
    name: "NIC Number",
    type: "text",
    label: "nicnumber",
  },
  { id: "8", name: "Date Of Birth", label: "date", type: "date" },
  { id: "9", name: "Address", label: "address", type: "text" },
];

/* ---------------------------------------------------------- */

export const PopupForm = ({
  closeModal,
  handleChange,
  handleSubmit,
  formData,
  isEditMode = false,
}) => {
  /* ---------------- HELPERS (UNCHANGED) ---------------- */
  const getValue = (label) => {
    const v = formData?.[label];
    if (label === "date" && typeof v === "string" && v.includes("T")) {
      return v.slice(0, 10);
    }
    return v ?? "";
  };

  const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

  /* ---------------- VALIDATION STATE ---------------- */
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  /* ---------------- 🔴 CHANGED VALIDATION ---------------- */
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

    // 🔴 ADD: NIC number validation ONLY if "With NIC"
    if (formData.nic === "With NIC") {
      if (!formData.nicnumber?.trim()) {
        e.nicnumber = "NIC number is required";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- 🔴 CHANGED HANDLER ---------------- */
  const handleChangeWithValidation = (e) => {
    handleChange(e);

    // 🔴 ADD: Clear NIC number if "Without NIC" is selected
    if (e.target.name === "nic" && e.target.value === "Without NIC") {
      handleChange({
        target: { name: "nicnumber", value: "" },
      });
    }

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-green-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-6 py-4">
          <h1 className="text-green-800 text-3xl font-serif font-stretch-105%">
            {isEditMode ? "Update Family Member" : "Add Family Member"}
            <br />
            <span className="text-green-400 text-xl">
              {isEditMode
                ? "Update family member to manage appointments"
                : "Add a family member to manage appointments"}
            </span>
          </h1>
          <X
            className="cursor-pointer hover:text-green-600"
            onClick={closeModal}
          />
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-3  overflow-y-auto flex-1">
          {inputs.map((input) => {
            /* 🔴 ADD: HIDE NIC NUMBER FIELD CONDITIONALLY */
            if (
              input.label === "nicnumber" &&
              formData.nic !== "With NIC"
            ) {
              return null;
            }

            const currentValue = getValue(input.label);

            return (
              <div key={input.id}>
                <label className="block text-lg font-semibold text-green-700 mb-1">
                  {input.name}
                </label>

                {input.type === "select" ? (
                  <select
                    name={input.label}
                    value={currentValue}
                    onChange={handleChangeWithValidation}
                    className="w-full border border-green-300 rounded-lg px-3 py-2"
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
                          checked={normalize(currentValue) === normalize(opt)}
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
                    className="w-full border border-green-300 rounded-lg px-3 py-2"
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
            <motion.button
              type="button"
              onClick={() => validate() && handleSubmit()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              {isEditMode ? "Update Details" : "Add Details"}
            </motion.button>

            <motion.button
              type="button"
              onClick={closeModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
