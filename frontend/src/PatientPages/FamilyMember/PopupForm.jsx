// import React from "react";
// import { X } from "lucide-react";

// const inputs = [
//   {
//     id: "1",
//     name: "Patient Name",
//     label: "name",
//     type: "text",
//   },
//   {
//     id: "2",
//     name: "Relationship",
//     type: "select",
//     label: "relationship",
//     options: ["Father", "Mother", "Spouse", "Son", "Daughter", "Other"],
//   },
//   {
//     id: "3",
//     name: "Phone Number",
//     label: "phone",
//     type: "tel",
//   },
//   {
//     id: "4",
//     name: "Email Address",
//     label: "email",
//     type: "email",
//   },
//   {
//     id: "5",
//     name: "Gender",
//     type: "radio",
//     label: "gender",
//     options: ["Male", "Female"],
//   },
//   {
//     id: "6",
//     name: "Date Of Birth",
//     label: "date",
//     type: "date",
//   },
//   {
//     id: "7",
//     name: "Address",
//     label: "address",
//     type: "text",
//   },
// ];

// export const PopupForm = ({
//   closeModal,
//   handleChange,
//   handleSubmit,
//   formData,
//   isEditMode = false,
//   editId = null,
// }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
//       onClick={closeModal}
//     >
//       <div
//         className="bg-white border-2 border-cyan-400 rounded-lg w-[25%] shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="pl-9 py-2">
//           <div className="flex flex-row justify-evenly items-center pt-4">
//             <div>
//               <h1 className="text-cyan-800 text-md">
//                 {isEditMode ? "Update Family Member " : "Add Family Member "}
//                 <br />
//                 <span className="text-cyan-400">
//                   {isEditMode
//                     ? " Update family member to manage their appointments"
//                     : " Add a family member to manage their appointments"}
//                 </span>
//               </h1>
//             </div>
//             <div>
//               <X
//                 className="cursor-pointer hover:text-cyan-600"
//                 onClick={closeModal}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col pl-5">
//             <div>
//               {inputs.map((input) => (
//                 <div className="p-2.5" key={input.id}>
//                   {input.type === "select" ? (
//                     <div className="p-2">
//                       <label className="font-medium text-cyan-700 py-2.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <select
//                         className="border-2 border-cyan-500 rounded-md p-1"
//                         onChange={handleChange}
//                         name={input.label}
//                         value={formData[input.label] || ""}
//                       >
//                         <option value="">Select A Relationship</option>
//                         {input.options.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : input.type === "radio" ? (
//                     <div className="p-2">
//                       <label className="font-medium text-cyan-700 py-2.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <div className="flex flex-row gap-4 pt-2">
//                         {input.options.map((option) => (
//                           <label key={option} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="radio"
//                               name={input.label}
//                               value={option}
//                               checked={formData[input.label] === option}
//                               onChange={handleChange}
//                               className="w-4 h-4 text-cyan-500 border-cyan-500 focus:ring-cyan-500"
//                             />
//                             <span className="text-cyan-700">{option}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="">
//                       <label className="p-2 font-medium text-cyan-700 py-1.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <input
//                         type={input.type}
//                         className="border-2 border-cyan-500 w-[95%] rounded-md p-0.5"
//                         placeholder={input.name}
//                         onChange={handleChange}
//                         name={input.label}
//                         value={formData[input.label] || ""}
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="py-2.5 flex flex-row">
//                 <button
//                   className="p-1.5 text-white bg-cyan-500 hover:bg-cyan-700 rounded-2xl w-50"
//                   onClick={handleSubmit}
//                   type="button"
//                 >
//                   {isEditMode ? "Update Details" : "Add Details"}
//                 </button>
//                 <button
//                   className="p-1.5 hover:bg-gray-300 border-2 border-gray-100 rounded-2xl w-40"
//                   onClick={closeModal}
//                   type="button"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from "react";
import { X } from "lucide-react";

const inputs = [
  { id: "1", name: "Patient Name", label: "name", type: "text" },
  {
    id: "2",
    name: "Relationship",
    type: "select",
    label: "relationship",
    options: ["Father", "Mother", "Spouse", "Son", "Daughter", "Other", "Child", "Parent", "Sibling"],
  },
  { id: "3", name: "Phone Number", label: "phone", type: "tel" },
  { id: "4", name: "Email Address", label: "email", type: "email" },
  { id: "5", name: "Gender", type: "radio", label: "gender", options: ["Male", "Female"] },
  { id: "6", name: "Date Of Birth", label: "date", type: "date" },
  { id: "7", name: "Address", label: "address", type: "text" },
];

export const PopupForm = ({
  closeModal,
  handleChange,
  handleSubmit,
  formData,
  isEditMode = false,
  editId = null,
}) => {
  // ✅ helpers (no style changes)
  const getValue = (label) => {
    const v = formData?.[label];

    // If backend gives date like "1990-01-01T00:00:00", make it "1990-01-01"
    if (label === "date" && typeof v === "string" && v.includes("T")) {
      return v.slice(0, 10);
    }
    return v ?? "";
  };

  const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

  return (
    <div
      className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white border-2 border-cyan-400 rounded-lg w-[25%] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pl-9 py-2">
          <div className="flex flex-row justify-evenly items-center pt-4">
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

          <div className="flex flex-col pl-5">
            <div>
              {inputs.map((input) => {
                const currentValue = getValue(input.label);

                return (
                  <div className="p-2.5" key={input.id}>
                    {input.type === "select" ? (
                      <div className="p-2">
                        <label className="font-medium text-cyan-700 py-2.5">
                          {input.name}
                        </label>
                        <br />
                        <select
                          className="border-2 border-cyan-500 rounded-md p-1"
                          onChange={handleChange}
                          name={input.label}
                          value={currentValue}
                        >
                          <option value="">Select A Relationship</option>

                          {/* ✅ If backend value is not inside options, still show it */}
                          {currentValue &&
                            !input.options.includes(currentValue) && (
                              <option value={currentValue}>{currentValue}</option>
                            )}

                          {input.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : input.type === "radio" ? (
                      <div className="p-2">
                        <label className="font-medium text-cyan-700 py-2.5">
                          {input.name}
                        </label>
                        <br />
                        <div className="flex flex-row gap-4 pt-2">
                          {input.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={input.label}
                                value={option}
                                checked={normalize(currentValue) === normalize(option)}
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
                        <label className="p-2 font-medium text-cyan-700 py-1.5">
                          {input.name}
                        </label>
                        <br />
                        <input
                          type={input.type}
                          className="border-2 border-cyan-500 w-[95%] rounded-md p-0.5"
                          placeholder={input.name}
                          onChange={handleChange}
                          name={input.label}
                          value={currentValue}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="py-2.5 flex flex-row">
                <button
                  className="p-1.5 text-white bg-cyan-500 hover:bg-cyan-700 rounded-2xl w-50"
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
