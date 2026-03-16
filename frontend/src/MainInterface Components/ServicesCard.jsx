import { Navigate, useNavigate } from "react-router-dom";
import  { useState } from "react";
export function Services(props) {

  const [expanded, setExpanded] = useState(false);



  const navigate = useNavigate();


  const handleBookAppointment = () => {
    navigate("/login");
  };

  return (
    <div className=" flex flex-col justify-between h-[420px] p-6 bg-white rounded-2xl border-2 border-green-300 w-full max-w-[280px] mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <h1 className="font-bold text-xl text-green-700 pb-2">{props.title}</h1>
      <div>
        {
          <img
            src={props.img}
            alt={props.title}
            className="w-50 h-60  mb-4 mx-auto hover:scale-110 duration-400"
          />
        }
      </div>
      <div className=" text-center overflow-y-auto max-h-[80px]">
         <p
        className={`text-lg text-black text-center transition-all duration-300 ${
          expanded ? "" : "line-clamp-1"
        }`}
      >
        {props.description}
      </p>
      {props.description.length > 30 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-green-600 font-bold hover:underline text-sm"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
      </div>

    </div>
  );
}
