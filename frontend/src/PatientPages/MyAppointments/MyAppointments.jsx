import React, { useState } from "react";
import { RecentAppoinment } from "./RecentAppoinment";
import { appointmentdata } from "../data/appointmentdata";
import { Review} from "./Review";

export const MyAppointments = () => {
  const [AppointmentList, setAppoinmentList] = useState(appointmentdata);

  const [Appoinment, setAppointment] = useState({
    id: "",
    patientId: "",
    patientName: "",
    date: "",
    time: "",
    status: "",
    type: "",
    notes: "",
  });


  const [IsOpen,setIsOpen]=useState(false);


  const OpenReviewCard=()=>{

    setIsOpen(true);

  }
  const CloseReviewCard=()=>{
    setIsOpen(false);
  }
  
  return (
    <div>
      <div className="">
        <RecentAppoinment AppointmentList={AppointmentList} OpenReviewCard={OpenReviewCard} />
      </div>
      <div className="pt-10">

        <Review AppointmentList={AppointmentList} IsOpen={IsOpen} CloseReviewCard={CloseReviewCard}/>
      </div>
    </div>
  );
};
