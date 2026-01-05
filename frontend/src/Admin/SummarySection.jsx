import React, { useEffect, useState } from 'react';
import SummaryCard from '../Admin/SummaryCard';

const SummarySection = ({ appointments }) => {
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
  }, [appointments]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/appointment-summary');
      const data = await response.json();

      setSummary({
        total: data.total || 0,
        scheduled: data.scheduled || 0,
        completed: data.completed || 0,
        cancelled: data.cancelled || 0,
      });

      setError(null);
    } catch (err) {
      console.error('API Error:', err);
      // Fallback: calculate from local appointments
      const total = appointments.length;
      const scheduled = appointments.filter((a) => a.status === 'Scheduled').length;
      const completed = appointments.filter((a) => a.status === 'Completed').length;
      const cancelled = appointments.filter((a) => a.status === 'Cancelled').length;

      setSummary({ total, scheduled, completed, cancelled });
    } finally {
      setLoading(false);
    }
  };

  const summaryData = [
    {
      icon: '📅',
      title: 'Total Appointments',
      value: summary.total,
      color: 'blue',
    },
    {
      icon: '🕙',
      title: 'Scheduled',
      value: summary.scheduled,
      color: 'green',
    },
    {
      icon: '✅',
      title: 'Completed',
      value: summary.completed,
      color: 'yellow',
    },
    {
      icon: '❌',
      title: 'Cancelled',
      value: summary.cancelled,
      color: 'red',
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