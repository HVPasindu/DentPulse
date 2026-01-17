import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TreatmentChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Number of Patients',
        data: Object.values(data),
        backgroundColor: [
          'rgba(22, 163, 74, 0.85)',   // green-500
            'rgba(250, 204, 21, 0.85)',    // cyan
            'rgba(20, 184, 166, 0.85)',   // teal
            'rgba(34, 197, 94, 0.85)',    // green
            'rgba(139, 92, 246, 0.85)',   // violet
            'rgba(236, 72, 153, 0.85)',   // pink
                    ],
        borderColor: [
          'rgba(22, 163, 74, 0.85)',   // green-500,
            'rgba(202, 138, 4, 1)',
            'rgb(20, 184, 166)',

            'rgb(34, 197, 94)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
        
        ],
        borderWidth: 3,
        borderRadius: 8,
        barThickness: 60,
        hoverBackgroundColor: [
          'rgba(46, 125, 50, 1)',
          'rgba(255, 235, 59, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(236, 72, 153, 1)',
        ],
        hoverBorderWidth: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', 'Segoe UI', sans-serif"
          },
          color: '#38A169', // green-600
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: '📊 Treatment Types Distribution',
        font: {
          size: 24,
          weight: 'bold',
          family: "'Inter', 'Segoe UI', sans-serif"
        },
        color: '#38A169', // cyan-700
        padding:  {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#38A169',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont:  {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
            return `Patients: ${context.parsed.y} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 13,
            weight: '600'
          },
          color: '#2e7d32', // green-900
          padding: 8
        },
        title: {
          display: true,
          text: '👥 Number of Patients',
          font:  {
            size: 15,
            weight: 'bold'
          },
          color: '#000000', // green-700
          padding: 12
        },
        grid: {
          color: 'rgba(6, 182, 212, 0.1)',
          lineWidth: 1
        }
      },
      x: {
        ticks: {
          font: {
            size: 13,
            weight: '600'
          },
          color: '#2e7d32', // green-900
          padding: 8
        },
        title: {
          display: true,
          text:  '🦷 Treatment Type',
          font: {
            size: 15,
            weight: 'bold'
          },
          color: '#000000', // green-700
          padding: 12
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="h-[450px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TreatmentChart;