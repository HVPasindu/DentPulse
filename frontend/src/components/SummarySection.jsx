import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { getAllAppointmentSummary } from "../api/countApi";

/* ==================== Summary Card Component ==================== */
// මේක එක එක summary card එක display කරන component එක
// Props: icon, title, value (count), color (blue/green/yellow/red)
const SummaryCard = ({ icon, title, value, color }) => {
  // Color classes - හැම color එකකටම border, background, text colors define කරලා තියෙනවා
  const colorClasses = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  // Pass කරන color එක තිබ්බොත් ඒක use කරනවා, නැත්තං default blue use කරනවා
  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between border-l-4 ${colors.border}`}
    >
      <div className="flex items-center space-x-3">
        {/* Icon එක color කරලා rounded background එකක දානවා */}
        <div className={`p-3 rounded-full ${colors.bg} ${colors.text}`}>
          {icon}
        </div>
        <div>
          {/* Title එක (Scheduled, Completed, etc.) */}
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {/* Count value එක bold කරලා display කරනවා */}
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

/* ==================== Summary Section Component ==================== */
// මේක main component එක - backend එකෙන් data fetch කරලා summary cards display කරනවා
const SummarySection = () => {
  const [summary, setSummary] = useState({
    total: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointmentSummary();
      console.log("Backend Response:", data);

      setSummary({
        total: data.total || 0,
        scheduled: data.scheduled || 0,
        completed: data.completed || 0,
        cancelled: data.cancelled || 0,
      });

      setError(null);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load appointment summary");
    } finally {
      setLoading(false);
    }
  };

  const summaryData = [
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Total Appointments",
      value: summary.total,
      color: "blue",
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Scheduled",
      value: summary.scheduled,
      color: "green",
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Completed",
      value: summary.completed,
      color: "yellow",
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Cancelled",
      value: summary.cancelled,
      color: "red",
    },
  ];

  if (loading) {
    return <p className="text-gray-500">Loading summary...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
