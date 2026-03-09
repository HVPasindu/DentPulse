import { Navigate, useNavigate } from "react-router-dom";
import  { useState } from "react";
export function Services(props) {

  const [expanded, setExpanded] = useState(false);



  const navigate = useNavigate();


  const handleBookAppointment = () => {
    navigate("/login");
  };

  return (
    <div className=" flex flex-col justify-center items-center p-10 bg-white rounded-2xl py-5 border-green-300 border-2 w-[400px] mx-auto hover:shadow-lg hover:scale-110 transition-transform duration-300">
      <h1 className="font-bold text-2xl text-green-700 pb-2">{props.title}</h1>
      <div>
        {
          <img
            src={props.img}
            alt={props.title}
            className="w-64 h-72  mb-4 mx-auto hover:scale-120 duration-400"
          />
        }
      </div>
      <div className=" items-center justify-center">
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
