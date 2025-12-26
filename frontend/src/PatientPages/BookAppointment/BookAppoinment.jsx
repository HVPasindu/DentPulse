import React, { useState, useEffect } from "react";
import { AppointmentDate } from "./AppointmentDate";
import { SelectPatient } from "./SelectPatient";
import { TimeSlot } from "./TimeSlot";
import { paitentdata } from "../data/paitentdata";

export const BookAppoinment = () => {

  const [FamilyDetail] = useState(paitentdata);
  const [appointment, setAppointments] = useState({
    id: "apt_001",
    patientId: "owner_001",
    patientName: "John Doe",
    date: "2024-12-28",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Checkup",
    notes: "Regular dental checkup",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);

  const handleChange = (e) => {
    const id = Number(e.target.value);
    const result = FamilyDetail.find((person) => person.id === id);
    setSelectedPatient(result);
  };

  const setDate = (e) => {
    const date = e.target.value;
    if (selectedPatient) {
      setSelectDate(date);
      console.log("Date is successfully selected!", date);
    } else {
      alert("Select a Patient First!");
    }
  };

  const setTime = (e) => {
    const time = e.target.value;
    if (selectDate && selectedPatient) {
      setSelectTime(time);
      console.log("Time is successfully selected!", time);
    } else {
      alert("Please select date and patient first");
    }
  };

  const bookAppointment = () => {
    if (selectedPatient && selectDate && selectTime) {
      const newAppointment = {
        ...appointment,
        id: `apt_${Date.now()}`,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: selectDate.toDateString ? selectDate.toDateString() : selectDate,
        time: selectTime,
        status: "Confirmed",
      };
      
      setAppointments(newAppointment);
      console.log("Patient scheduled successfully!", newAppointment);
      
      
      setSelectTime(null);
      setSelectDate(null);
      setSelectedPatient(null);
      
      alert("Appointment booked successfully!");
    } else {
      alert("Please select patient, date, and time");
    }
  };

  useEffect(() => {
    if (selectedPatient && selectDate && selectTime) {
      console.log("Selected patient:", selectedPatient);
      console.log("Selected date:", selectDate);
      console.log("Selected time:", selectTime);
    }
  }, [selectedPatient, selectDate, selectTime]);

  return (
    <div>
      <div className="flex flex-col bg-cyan-50 p-4 min-h-screen">
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
          />
        </div>
      </div>
    </div>
  );
};