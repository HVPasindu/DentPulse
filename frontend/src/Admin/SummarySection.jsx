import React, { useEffect, useState } from "react";
import SummaryCard from "../Admin/SummaryCard";
import { fetchAppointmentStats } from "../api/adminAppointmentApi";

/*
====================================================
OLD VERSION (COMMENTED – DO NOT DELETE)
----------------------------------------------------
This version:
- Called a fake endpoint (/api/appointment-summary)
- Calculated fallback values from appointments
====================================================

useEffect(() => {
  fetchSummary();
}, [appointments]);

const fetchSummary = async () => {
  try {
    const response = await fetch('/api/appointment-summary');
    const data = await response.json();
    setSummary(data);
  } catch (err) {
    // fallback from appointments array
  }
};
====================================================
*/

/*
====================================================
NEW VERSION (BACKEND-DRIVEN)
----------------------------------------------------
Summary data is fetched ONLY from:
GET /api/v1/admin/appointments/stats
====================================================
*/

const SummarySection = ({stats}) => {
  const [summary, setSummary] = useState({
    total: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const response = await fetchAppointmentStats();

      setSummary({
        total: response.data.total,
        scheduled: response.data.scheduled,
        completed: response.data.completed,
        cancelled: response.data.cancelled,
      });

      setError(null);
    } catch (err) {
      console.error("Failed to load appointment summary", err);
      setError("Failed to load appointment summary");
    } finally {
      setLoading(false);
    }
  };
  */

  useEffect(() => {
  if (stats) {
    setSummary({
      total: stats.total,
      scheduled: stats.scheduled,
      completed: stats.completed,
      cancelled: stats.cancelled,
    });
    setLoading(false);
  }
}, [stats]);


  const summaryData = [
    { icon: "📅", title: "Total Appointments", value: summary.total, color: "blue" },
    { icon: "🕙", title: "Scheduled", value: summary.scheduled, color: "teal" },
    { icon: "✅", title: "Completed", value: summary.completed, color: "green" },
    { icon: "❌", title: "Cancelled", value: summary.cancelled, color: "orange" },
  ];

  if (loading) return <p className="text-gray-500">Loading summary...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <SummaryCard
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default SummarySection;