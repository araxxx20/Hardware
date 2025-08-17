import React, { useState, useEffect } from 'react';
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

function Chart() {
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [salesData, setSalesData] = useState({
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Pliers',
          data: [12, 19, 15, 25, 22, 30, 28],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Circuit Breaker',
          data: [8, 15, 12, 18, 20, 25, 22],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Electrical Tape',
          data: [5, 10, 8, 15, 12, 18, 16],
          borderColor: 'rgb(255, 206, 86)',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Steel Nails',
          data: [20, 25, 22, 30, 28, 35, 32],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.4,
        },
      ],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Pliers',
          data: [85, 92, 78, 95],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Circuit Breaker',
          data: [65, 72, 68, 75],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Electrical Tape',
          data: [45, 52, 48, 55],
          borderColor: 'rgb(255, 206, 86)',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Steel Nails',
          data: [120, 135, 128, 142],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.4,
        },
      ],
    },
    yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Pliers',
          data: [320, 350, 380, 420, 450, 480, 520, 550, 580, 620, 650, 680],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Circuit Breaker',
          data: [280, 310, 340, 370, 400, 430, 460, 490, 520, 550, 580, 610],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Electrical Tape',
          data: [200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420],
          borderColor: 'rgb(255, 206, 86)',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Steel Nails',
          data: [450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.4,
        },
      ],
    },
  });

  // Real-time data update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prevData => {
        const newData = { ...prevData };
        
        // Update current period data with small random variations
        Object.keys(newData).forEach(period => {
          newData[period].datasets.forEach(dataset => {
            dataset.data = dataset.data.map(value => {
              // Add small random variation (±5% of current value)
              const variation = (Math.random() - 0.5) * 0.1; // ±5%
              return Math.max(0, Math.round(value * (1 + variation)));
            });
          });
        });
        
        return newData;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: `Product Sales Trend - ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} View`,
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: timePeriod === 'weekly' ? 'Days of Week' : 
                timePeriod === 'monthly' ? 'Weeks' : 'Months',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales Quantity',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        borderWidth: 2
      }
    }
  };

  const currentData = salesData[timePeriod];

  return (
    <div className="w-full">
      {/* Time Period Selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setTimePeriod('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timePeriod === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimePeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timePeriod === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimePeriod('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timePeriod === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yearly
          </button>
        </div>
        
        {/* Real-time indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">Live Data</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 bg-white rounded-lg p-4 border">
        <Line data={currentData} options={options} height={256} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {currentData.datasets.map((dataset, index) => {
          const total = dataset.data.reduce((sum, val) => sum + val, 0);
          const avg = Math.round(total / dataset.data.length);
          const trend = dataset.data[dataset.data.length - 1] > dataset.data[0] ? 'up' : 'down';
          
          return (
            <div key={index} className="bg-white rounded-lg p-3 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium">{dataset.label}</p>
                  <p className="text-lg font-bold text-gray-800">{total}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Avg: {avg}/period</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chart;