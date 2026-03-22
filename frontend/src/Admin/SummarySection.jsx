import React, { useEffect, useState } from "react";
import SummaryCard from "../Admin/SummaryCard";
import { fetchAppointmentStats } from "../api/adminAppointmentApi";



const SummarySection = ({stats}) => {
  const [summary, setSummary] = useState({
    total: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
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