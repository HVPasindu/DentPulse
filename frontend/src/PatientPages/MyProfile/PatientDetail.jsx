import React from "react";
import { paitentdata } from "../data/paitentinputs";
import PaitentDetailCardComponent from "./PaitentDetailCardComponent";
import { UserRoundPen } from "lucide-react";
export const PatientDetail = () => {
  return (
    <div className="bg-white border-2 border-cyan-400 rounded-2xl p-8  ">
      <div>
        <div className="flex flex-row">
          <div>
            <UserRoundPen />
          </div>
          <h1 className="p-1.5 text-cyan-700"> Paitent Details</h1>
        </div>

        <h1 className="p-1.5 text-cyan-400">
          Update your personal information
        </h1>
      </div>
      {/* {paitentdata.map((data) => (
        




        <PaitentDetailCardComponent type={data.type} name={data.name} />
      ))} */}
     

          {paitentdata.map((data) => (
        data.type === "radio" ? (
          <div className="flex flex-col p-2" key={data.id}>
            <label className="font-light text-cyan-600">{data.name}</label>
            <div className="flex flex-row gap-6 pt-2">
              {(data.genders || data.options || []).map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={data.label || data.name.toLowerCase()}
                    value={option}
                    className="w-4 h-4 text-cyan-500 border-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-cyan-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ) : data.type === "select" ? (
          <div className="flex flex-col p-2" key={data.id}>
            <label className="font-light text-cyan-600">{data.name}</label>
            <select
              name={data.label || data.name.toLowerCase()}
              className="rounded-lg border-2 border-cyan-400 bg-gray-200 p-2"
            >
              <option value="">Select {data.name}</option>
              {(data.options || []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <PaitentDetailCardComponent 
            type={data.type} 
            name={data.name} 
            key={data.id} 
          />
        )
      ))}

      <div className="flex justify-center">
        <button className="p-2 w-[90%] text-white bg-cyan-600 hover:bg-cyan-800 rounded-2xl">
          Update Details
        </button>
      </div>
    </div>
  );
};




//  <div>
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