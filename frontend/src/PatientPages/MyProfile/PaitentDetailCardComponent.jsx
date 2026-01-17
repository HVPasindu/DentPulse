import React from "react";

const PaitentDetailCardComponent = ({ type, name, value, onChange,label }) => {
  return (
    <>
    
      <div className="flex flex-col p-2 ">
        <label className="font-semibold text-lg text-green-800">{label}</label>
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="rounded-lg border  border-green-400  p-2"
          placeholder={name}
          readOnly={name === "email" || name === "phone"}
        />
      </div>
    </>
  );
};

export default PaitentDetailCardComponent;
