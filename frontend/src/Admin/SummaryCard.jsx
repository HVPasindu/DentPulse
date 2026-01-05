import React from 'react';

const SummaryCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    teal: {
      border: 'border-teal-600',
      bg: 'bg-teal-100',
      text: 'text-teal-600',
    },
    blue: {
      border: 'border-blue-600',
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    orange: {
      border: 'border-orange-600',
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
    purple: {
      border: 'border-purple-600',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
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