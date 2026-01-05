import React, { useState, useEffect } from "react";
import { AppointmentDate } from "./AppointmentDate";
import { SelectPatient } from "./SelectPatient";
import { TimeSlot } from "./TimeSlot";
import Recommendation from "./Recommendation";
import { paitentdata } from "../data/patientdata";

export const BookAppoinment = () => {
  const [FamilyDetail] = useState(paitentdata);

  // rename setter to singular for clarity
  const [appointment, setAppointment] = useState({
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
  // store date as Date object when possible
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);

  // AI slots state
  const [aiSlots, setAiSlots] = useState([]);

  const handleChange = (e) => {
    // ensure option values match FamilyDetail ids (string/number)
    const id = Number(e.target.value);
    const result = FamilyDetail.find((person) => Number(person.id) === id);
    setSelectedPatient(result || null);
  };

  const setDate = (e) => {
    const val = e.target.value;
    if (!selectedPatient) {
      alert("Select a Patient First!");
      return;
    }
    if (!val) return;

    // convert to a Date object for consistent formatting & checks
    const parsed = new Date(val);
    if (isNaN(parsed.getTime())) {
      // fallback: store raw string
      setSelectDate(val);
    } else {
      setSelectDate(parsed);
    }
    console.log("Date is successfully selected!", val);
  };

  const setTime = (eOrTime) => {
    let time;
    // If eOrTime is an event with target
    if (eOrTime?.target?.value) {
      time = eOrTime.target.value;
    } else {
      // Otherwise it's a direct string from TimeCardComponent
      time = eOrTime;
    }

    if (selectDate && selectedPatient) {
      setSelectTime(time);
      console.log("Time is successfully selected!", time);
    } else {
      alert("Please select date and patient first");
    }
  };

  const bookAppointment = () => {
    if (selectedPatient && selectDate && selectTime) {
      const formattedDate =
        selectDate instanceof Date ? selectDate.toDateString() : selectDate;

      const newAppointment = {
        ...appointment,
        id: `apt_${Date.now()}`,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: formattedDate,
        time: selectTime,
        status: "Confirmed",
      };

      setAppointment(newAppointment);
      console.log("Patient scheduled successfully!", newAppointment);

      // reset selections
      setSelectTime(null);
      setSelectDate(null);
      setSelectedPatient(null);
      // optionally clear AI suggestions: setAiSlots([]);

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

        {/* AI Recommendation Component */}
        <Recommendation selectDate={selectDate} setAiSlots={setAiSlots} />

        <div className="gap-6">
          <TimeSlot
            selectTime={selectTime}
            setTime={setTime}
            bookAppointment={bookAppointment}
            selectedPatient={selectedPatient}
            selectDate={selectDate}
            aiSlots={aiSlots}
          />
        </div>
      </div>
    </div>
  );
};

export default BookAppoinment;