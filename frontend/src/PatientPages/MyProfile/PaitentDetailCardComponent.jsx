import React from "react";

 const PaitentDetailCardComponent = (props) => {
  return (

    <>
      <div className="flex flex-col p-2 ">
        <label className="font-light text-cyan-600">{props.name}</label>
        <input type={props.type} className="rounded-lg border-2 border-cyan-400 bg-gray-200 p-2" placeholder={props.name}/>
      </div>
    </>

  );
};


export default PaitentDetailCardComponent;