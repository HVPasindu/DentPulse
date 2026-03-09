import React from "react";

/*
====================================================
OLD VERSION (COMMENTED – DO NOT DELETE)
----------------------------------------------------
Previously this component:
- Read appointments from localStorage
- Filtered today's appointments internally
- Used useEffect + window focus listeners

Now backend already provides `todayAppointments`,
so this logic is no longer required.
====================================================

import React, { useState, useEffect } from "react";

export default function DashboardRecentAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const updateTodaysList = () => {
      const saved = localStorage.getItem("app_appointments");
      if (saved) {
        const allAppointments = JSON.parse(saved);
        const todayStr = new Date().toISOString().split("T")[0];
        const todaysList = allAppointments.filter(appt => appt.date === todayStr);
        const sorted = todaysList.sort((a, b) => a.time.localeCompare(b.time));
        setAppointments(sorted);
      }
    };

    updateTodaysList();
    window.addEventListener("focus", updateTodaysList);
    return () => window.removeEventListener("focus", updateTodaysList);
  }, []);
}
*/

/*
====================================================
NEW VERSION (BACKEND-DRIVEN)
----------------------------------------------------
Appointments are passed as props from:
DashboardPage.jsx → summary.todayAppointments

This makes the component PURE UI.
====================================================
*/

export default function DashboardRecentAppointments({ appointments = [] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Appointments
          </h2>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button className="text-sm font-medium text-cyan-600 hover:text-teal-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400 text-sm italic">
              No appointments scheduled for today.
            </p>
          </div>
        ) : (
          appointments.map((appointment) => {
            const isSpecial = appointment.type;

            return (
              <div
                key={appointment.appointmentId}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  isSpecial
                    ? "border-indigo-100 bg-indigo-50/40 hover:shadow-md"
                    : "border-gray-100 hover:bg-gray-50 hover:shadow-sm"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 truncate">
                      {appointment.fullName}
                    </p>
                    {isSpecial && (
                      <span className="text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-tighter">
                        {appointment.type}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-mono tracking-tight">
                    PID: {appointment.patientId}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-700">
                      {appointment.startTime}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[120px]">
                      {appointment.type || "General Checkup"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`min-w-[85px] text-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wide ${
                        appointment.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-sky-100 text-sky-700 border border-sky-200"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
