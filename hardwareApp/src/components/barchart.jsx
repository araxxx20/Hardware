import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Pliers', 'Bulbs', 'Screw Driver', 'Circuit Breaker', 'Hammer'],
  datasets: [
    {
      label: 'Product Sales',
      data: [30, 10, 14, 24, 12],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      ticks: { font: { size: 10 } },
    },
    y: {
      ticks: { font: { size: 10 } },
    },
  },
};

function BarChart() {
  return (
    <div className="w-full h-20 bg-white rounded flex items-center justify-center text-gray-400">
      <Bar data={data} options={options} height={80} />
    </div>
  );
}

export default BarChart; 