import React from "react";
import { Calendar, User, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";


export const NavigationButtons = () => {


  const navigate = useNavigate();

  const navigatetomyprofile=()=>{

    navigate('/patient')
  }


    const navigatetofamilymembers=()=>{

    navigate('/patient/family')
  }


    const navigatetobookappointment=()=>{

    navigate('/patient/bookappointments')
    
  }


    const navigatetomyappointments=()=>{

    navigate('/patient/myappointments')
  }
  return (
    <div className="bg-cyan-50 rounded-2xl grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20">
      <button className="bg-cyan-200 hover:bg-cyan-700 rounded-lg text-black p-1  hover:text-white" onClick={navigatetomyprofile}>
        <div className="size-0.5">
          <User />
        </div>
        My Profile
      </button>
      <button className="bg-cyan-200 hover:bg-cyan-700 rounded-lg text-black p-1 hover:text-white" onClick={navigatetofamilymembers}>
        <div className="size-0.5">
          <Users />
        </div>
        Family Members
      </button>
      <button className="bg-cyan-200 hover:bg-cyan-700 rounded-lg text-black p-1 hover:text-white" onClick={navigatetobookappointment}>
        <div className="size-0.5">
          <Calendar />
        </div>
        Book Appointment
      </button>
      <button className="bg-cyan-200 hover:bg-cyan-700 rounded-lg text-black p-1  hover:text-white" onClick={navigatetomyappointments}>
        <div className="size-0.5">
          <Clock />
        </div>
        My Appointment
      </button>
    </div>
  );
};
