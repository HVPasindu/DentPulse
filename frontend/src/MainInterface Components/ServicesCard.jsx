import { Navigate, useNavigate } from "react-router-dom";

export function Services(props) {
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
        <h1 className="text-lg text-black font-stretch-expanded">
          {props.description}
        </h1>
      </div>
      <div className="p-4">
        <button
          className="p-4 bg-green-600 rounded-2xl text-white hover:scale-110 duration-500 hover:bg-green-700"
          onClick={handleBookAppointment}
        >
          Book Appoinment
        </button>
      </div>
    </div>
  );
}
