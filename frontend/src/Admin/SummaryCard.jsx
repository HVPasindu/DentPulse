import React from 'react';

const SummaryCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    yellow: {
      border: 'border-yellow-500',
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
    },
    red: {
      border: 'border-red-500',
      bg: 'bg-red-100',
      text: 'text-red-600',
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

export default SummaryCard;