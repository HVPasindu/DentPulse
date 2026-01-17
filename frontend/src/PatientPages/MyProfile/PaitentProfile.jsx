// import React from "react";
// import PatientHeader from "../StaticPages/PatientHeader";
// import { AppointmentDate } from "../BookAppointment/AppointmentDate";
// import { PatientDetail } from "./PatientDetail";

// import { PatientIdCard } from "./PatientIdCard";
// import { NavigationButtons } from "../StaticPages/NavigationButtons";
// const MainInterface = () => {
//   return (
//     <>
  
    
//         <div className="">
     
//           <PatientIdCard />

//       </div>
//     </>
//   );
// };

// export default MainInterface;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { PatientDetail } from "./PatientDetail";
import { PatientIdCard } from "./PatientIdCard";

const MainInterface = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:8080/api/v1/patient/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatient(res.data);
      } catch (err) {
        console.error("Failed to fetch patient", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (loading) {
    return <p className="text-green-700 p-6">Loading patient data...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <PatientDetail patient={patient} setPatient={setPatient} />
      <PatientIdCard patient={patient} />
    </div>
  );
};

export default MainInterface;
