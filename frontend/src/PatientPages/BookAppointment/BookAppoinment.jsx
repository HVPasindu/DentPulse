// import React, { useState, useEffect } from "react";
// import { AppointmentDate } from "./AppointmentDate";
// import { SelectPatient } from "./SelectPatient";
// import { TimeSlot } from "./TimeSlot";
// import { paitentdata } from "../data/paitentdata";

// export const BookAppoinment = () => {

//   const [FamilyDetail] = useState(paitentdata);
//   const [appointment, setAppointments] = useState({
//     id: "apt_001",
//     patientId: "owner_001",
//     patientName: "John Doe",
//     date: "2024-12-28",
//     time: "10:00 AM",
//     status: "Confirmed",
//     type: "Checkup",
//     notes: "Regular dental checkup",
//   });
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [selectDate, setSelectDate] = useState(null);
//   const [selectTime, setSelectTime] = useState(null);

//   const handleChange = (e) => {
//     const id = Number(e.target.value);
//     const result = FamilyDetail.find((person) => person.id === id);
//     setSelectedPatient(result);
//   };

//   const setDate = (e) => {
//     const date = e.target.value;
//     if (selectedPatient) {
//       setSelectDate(date);
//       console.log("Date is successfully selected!", date);
//     } else {
//       alert("Select a Patient First!");
//     }
//   };

//   const setTime = (e) => {
//     const time = e.target.value;
//     if (selectDate && selectedPatient) {
//       setSelectTime(time);
//       console.log("Time is successfully selected!", time);
//     } else {
//       alert("Please select date and patient first");
//     }
//   };

//   const bookAppointment = () => {
//     if (selectedPatient && selectDate && selectTime) {
//       const newAppointment = {
//         ...appointment,
//         id: `apt_${Date.now()}`,
//         patientId: selectedPatient.id,
//         patientName: selectedPatient.name,
//         date: selectDate.toDateString ? selectDate.toDateString() : selectDate,
//         time: selectTime,
//         status: "Confirmed",
//       };
      
//       setAppointments(newAppointment);
//       console.log("Patient scheduled successfully!", newAppointment);
      
      
//       setSelectTime(null);
//       setSelectDate(null);
//       setSelectedPatient(null);
      
//       alert("Appointment booked successfully!");
//     } else {
//       alert("Please select patient, date, and time");
//     }
//   };

//   useEffect(() => {
//     if (selectedPatient && selectDate && selectTime) {
//       console.log("Selected patient:", selectedPatient);
//       console.log("Selected date:", selectDate);
//       console.log("Selected time:", selectTime);
//     }
//   }, [selectedPatient, selectDate, selectTime]);

//   return (
//     <div>
//       <div className="flex flex-col bg-green-50 p-4 min-h-screen">
//         <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly gap-7">
//           <SelectPatient
//             FamilyDetail={FamilyDetail}
//             handleChange={handleChange}
//             selectedPatient={selectedPatient}
//           />
//           <AppointmentDate
//             selectedPatient={selectedPatient}
//             setDate={setDate}
//             selectDate={selectDate}
//           />
//         </div>
//         <div className="gap-6">
//           <TimeSlot
//             selectTime={selectTime}
//             setTime={setTime}
//             bookAppointment={bookAppointment}
//             selectedPatient={selectedPatient}
//             selectDate={selectDate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { AppointmentDate } from "./AppointmentDate";
import { SelectPatient } from "./SelectPatient";
import { TimeSlot } from "./TimeSlot";
import axios from "axios";

export const BookAppoinment = () => {
  const [FamilyDetail, setFamilyDetail] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [appointment, setAppointments] = useState({
    id: "apt_001",
    patientId: "owner_001",
    patientName: "John Doe",
    date: "2025-01-12",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Checkup",
    notes: "Regular dental checkup",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch patients from backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8080/api/v1/patient/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFamilyDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const id = Number(e.target.value);
    const result = FamilyDetail.find((person) => person.patientId === id);
    setSelectedPatient(result);
  };

  const setDate = (e) => {
    const date = e.target.value;
    if (selectedPatient) {
      setSelectDate(date);
      fetchBookedTimes(date);
    } else {
      alert("Select a Patient First!");
    }
  };

  const setTime = (e) => {
    const time = e.target.value;
    if (selectDate && selectedPatient) {
      setSelectTime(time);
    } else {
      alert("Please select date and patient first");
    }
  };

  // Fetch booked time slots from backend
  const fetchBookedTimes = async (date) => {
    try {
      const token = localStorage.getItem("authToken");
      
      // Format date to YYYY-MM-DD (local timezone)
      let formattedDate = date;
      if (date instanceof Date) {
        // Use local date without timezone conversion
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }
      
      console.log("🔍 Fetching booked times for date:", formattedDate);
      
      const response = await axios.get(
        `http://localhost:8080/api/appointments/booked-times?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("✅ Fetched booked times:", response.data);
      setBookedTimes(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch booked times:", error);
      setBookedTimes([]);
    }
  };

  // Book appointment - POST request to backend
  const bookAppointment = async () => {
    if (!selectedPatient || !selectDate || !selectTime) {
      alert("Please select patient, date, and time");
      return;
    }

    setIsBooking(true);

    try {
      const token = localStorage.getItem("authToken");
      
      // Format date to YYYY-MM-DD (local timezone)
      let formattedDate = selectDate;
      if (selectDate instanceof Date) {
        // Use local date without timezone conversion
        const year = selectDate.getFullYear();
        const month = String(selectDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectDate.getDate()).padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      }

      // Prepare appointment data
      const appointmentData = {
        patientId: selectedPatient.patientId,
        appointmentDate: formattedDate,
        startTime: selectTime,
      };

      console.log("📤 Booking appointment:", appointmentData);

      // POST request to book appointment
      const response = await axios.post(
        "http://localhost:8080/api/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Appointment booked successfully:", response.data);
      
      // Show success message
      alert(`Appointment booked successfully for ${selectedPatient.fullName} on ${formattedDate} at ${selectTime}`);
      
      // Reset form
      setSelectTime(null);
      setSelectDate(null);
      setSelectedPatient(null);
      setBookedTimes([]);

    } catch (error) {
      console.error("❌ Failed to book appointment:", error);
      
      // Handle specific error messages
      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data || "Failed to book appointment";
        alert(`Error: ${errorMessage}`);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col  p-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-evenly gap-7">
          <SelectPatient
            FamilyDetail={FamilyDetail}
            handleChange={handleChange}
            selectedPatient={selectedPatient}
          />
          <AppointmentDate
            selectedPatient={selectedPatient}
            setDate={setDate}
            selectDate={selectDate}
          />
        </div>
        <div className="gap-6">
          <TimeSlot
            selectTime={selectTime}
            setTime={setTime}
            bookAppointment={bookAppointment}
            selectedPatient={selectedPatient}
            selectDate={selectDate}
            bookedTimes={bookedTimes}
            isBooking={isBooking}
          />
        </div>
      </div>
    </div>
  );
};

