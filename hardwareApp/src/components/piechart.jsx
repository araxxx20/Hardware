import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const data = {
  labels: ['Dine-in', 'Takeaway', 'Delivery'],
  datasets: [
    {
      label: 'Order Types',
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 10,
        },
      },
    },
    title: { display: true, text: 'Order Types' },
  },
};

function PieChart() {
  return (
    <div className="w-full h-32 bg-white rounded flex items-center justify-center text-gray-400">
      <Pie data={data} options={options} height={128} />
    </div>
  );
}

export default PieChart; 