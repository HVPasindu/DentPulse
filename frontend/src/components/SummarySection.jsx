import React from "react";
import {
  UserIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";


const summaryData = [
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Total Appointments",
    value: "128",
    color: "blue",
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Scheduled",
    value: "14",
    color: "green",
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Completed",
    value: "6",
    color: "yellow",
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: "Cancelled",
    value: "2",
    color: "red",
  },
];


const SummaryCard = ({ icon, title, value, color }) => {
 
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

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between border-l-4 ${colors.border}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-full ${colors.bg} ${colors.text}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};


const SummarySection = () => {
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
