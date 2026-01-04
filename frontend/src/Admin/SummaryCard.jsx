import React from 'react';

const SummaryCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: {
      border: 'border-cyan-600',
      bg: 'bg-blue-200',
      text: 'text-blue-600',
      
      
    },
    green: {
      border: 'border-green-600',
      bg: 'bg-aqua-200',
      text: 'text-green-600',
    },
    yellow: {
      border: 'border-orange-600',
      bg: 'bg-yellow-200',
      text: 'text-yellow-600',
    },
    red: {
      border: 'border-red-600',
      bg: 'bg-magenta-200',
      text: 'text-red-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`bg-white  p-4 rounded-lg shadow-md flex items-center justify-between border-l-4 ${colors.border}`}
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

export default SummaryCard;