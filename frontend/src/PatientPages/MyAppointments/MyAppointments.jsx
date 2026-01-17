// import React, { useState } from "react";
// import { RecentAppoinment } from "./RecentAppoinment";
// import { appointmentdata } from "../data/appointmentdata";
// import { Review} from "./Review";

// export const MyAppointments = () => {
//   const [AppointmentList, setAppoinmentList] = useState(appointmentdata);

//   const [Appoinment, setAppointment] = useState({
//     id: "",
//     patientId: "",
//     patientName: "",
//     date: "",
//     time: "",
//     status: "",
//     type: "",
//     notes: "",
//   });


//   const [IsOpen,setIsOpen]=useState(false);


//   const OpenReviewCard=()=>{

//     setIsOpen(true);

//   }
//   const CloseReviewCard=()=>{
//     setIsOpen(false);
//   }
  
//   return (
//     <div>
//       <div className="">
//         <RecentAppoinment AppointmentList={AppointmentList} OpenReviewCard={OpenReviewCard} />
//       </div>
//       <div className="pt-10">

//         <Review AppointmentList={AppointmentList} IsOpen={IsOpen} CloseReviewCard={CloseReviewCard}/>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { RecentAppoinment } from "./RecentAppoinment";
import { Review } from "./Review";
import axios from "axios";

export const MyAppointments = () => {
  const [AppointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [IsOpen, setIsOpen] = useState(false);

  // Fetch appointments from backend when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Please login to view appointments");
        setIsLoading(false);
        return;
      }

      console.log("🔍 Fetching appointments...");

      const response = await axios.get(
        "http://localhost:8080/api/appointments/my-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Appointments fetched:", response.data);

      // Transform backend data to match frontend format
      const transformedData = response.data.map((apt) => ({
        id: apt.appointmentId,
        patientId: apt.patientId,
        patientName: apt.fullName,
        date: apt.appointmentDate,
        time: apt.startTime,
        status: apt.status,
        type: apt.type || "Checkup",
        notes: apt.notes || "",
      }));

      setAppointmentList(transformedData);
      setError(null);
    } catch (error) {
      console.error("❌ Failed to fetch appointments:", error);
      setError("Failed to load appointments. Please try again.");
      
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const OpenReviewCard = () => {
    setIsOpen(true);
  };

  const CloseReviewCard = () => {
    setIsOpen(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-semibold">Loading appointments...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 font-bold text-lg mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchAppointments}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <RecentAppoinment 
          AppointmentList={AppointmentList} 
          OpenReviewCard={OpenReviewCard}
          refreshAppointments={fetchAppointments}
        />
      </div>
      <div className="pt-10">
        <Review
          AppointmentList={AppointmentList}
          IsOpen={IsOpen}
          CloseReviewCard={CloseReviewCard}
        />
      </div>
    </div>
  );
};


