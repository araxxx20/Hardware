import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Pliers', 'Bulbs', 'Screw Driver', 'Circuit Breaker', 'Hammer'],
  datasets: [
    {
      label: '2023 Sales',
      data: [120, 190, 300, 500, 200],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: '2024 Sales',
      data: [100, 180, 280, 450, 220],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      borderDash: [5, 5], // Dashed line for distinction
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Profit Margin',
    },
  },
};

function Chart() {
  return (
    <div className="w-full h-48 bg-white rounded flex items-center justify-center text-gray-400">
      <Line data={data} options={options} height={192} />
    </div>
  );
}

export default Chart;