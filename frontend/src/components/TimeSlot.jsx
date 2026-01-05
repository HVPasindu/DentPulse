

import { timedata } from "../data/timedata";
import { TimeCardComponent } from "./TimeCardComponent";

export const TimeSlot = ({
  selectTime,
  setTime,
  selectedPatient,
  selectDate,
  aiSlots,
}) => {
  const getBusyLevel = (time) => {
    const slot = aiSlots.find((s) => s.time === time);
    return slot ? slot.busyLevel : null;
  };

  // Evening slots for weekdays (Monday - Friday)
  const eveningSlots = [
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const getTimesToShow = () => {
    if (!selectDate) return timedata;

    // Normalize selectDate to a Date object when possible
    const dateObj = selectDate instanceof Date ? selectDate : new Date(selectDate);
    if (isNaN(dateObj.getTime())) {
      return timedata;
    }

    let day = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    day = (day + 6) % 7;

    // Weekdays Monday(1) - Friday(5): show eveningSlots only
    if (day >= 0 && day <= 4) {
      return eveningSlots;
    }

    // Weekends (Saturday=6, Sunday=0): show original timedata
    return timedata;
  };

  const timesToRender = getTimesToShow();

  return (
    <div className="border-2 border-cyan-400 m-4 p-4 rounded-2xl bg-white">
      <h1 className="text-cyan-700 text-lg">Select Time Slot</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {timesToRender.map((data, index) => (
          <TimeCardComponent
            key={`${data}-${index}`}
            data={data}
            selectTime={selectTime}
            setTime={setTime}
            disabled={!selectedPatient || !selectDate}
            aiBusyLevel={getBusyLevel(data)}
          />
        ))}
      </div>
    </div>
  );
};

                                                                               