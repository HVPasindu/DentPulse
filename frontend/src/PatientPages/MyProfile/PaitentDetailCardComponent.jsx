import React from "react";

const PaitentDetailCardComponent = ({ type, name, value, onChange,label }) => {
  return (
    <>
    
      <div className="flex flex-col p-2 ">
        <label className="font-light text-cyan-600">{label}</label>
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="rounded-lg border-2 border-cyan-400 bg-gray-200 p-2"
          placeholder={name}
          readOnly={name === "email" || name === "phone"}
        />
      </div>
    </>
  );
};

export default PaitentDetailCardComponent;
