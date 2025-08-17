import React, { useState, useEffect } from 'react';
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

function BarChart() {
  const [chartType, setChartType] = useState('stockLevels');
  const [barData, setBarData] = useState({
    stockLevels: {
      labels: ['Pliers', 'Steel Nails', 'Circuit Breaker', 'Electrical Tape'],
      datasets: [
        {
          label: 'Current Stock',
          data: [0, 10, 0, 5],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',   // Red for out of stock
            'rgba(34, 197, 94, 0.8)',   // Green for good stock
            'rgba(239, 68, 68, 0.8)',   // Red for out of stock
            'rgba(245, 158, 11, 0.8)',  // Yellow for low stock
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    categoryDistribution: {
      labels: ['Tools', 'Hardware', 'Electrical'],
      datasets: [
        {
          label: 'Products per Category',
          data: [1, 1, 2],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    stockHealth: {
      labels: ['Out of Stock', 'Low Stock', 'In Stock'],
      datasets: [
        {
          label: 'Product Count',
          data: [2, 1, 1],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(34, 197, 94, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
  });

  // Real-time data update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBarData(prevData => {
        const newData = { ...prevData };
        
        // Update stock levels with small variations
        newData.stockLevels.datasets[0].data = newData.stockLevels.datasets[0].data.map(value => {
          if (value === 0) return 0; // Keep out of stock items at 0
          const variation = (Math.random() - 0.5) * 0.1; // ±5%
          return Math.max(0, Math.round(value * (1 + variation)));
        });

        // Update stock health based on new stock levels
        const stockLevels = newData.stockLevels.datasets[0].data;
        const outOfStock = stockLevels.filter(level => level === 0).length;
        const lowStock = stockLevels.filter(level => level > 0 && level < 5).length;
        const inStock = stockLevels.filter(level => level >= 5).length;
        
        newData.stockHealth.datasets[0].data = [outOfStock, lowStock, inStock];
        
        return newData;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
      },
      title: {
        display: true,
        text: chartType === 'stockLevels' ? 'Current Stock Levels' : 
              chartType === 'categoryDistribution' ? 'Products by Category' : 'Stock Health Overview',
        font: {
          size: 14,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            let label = context.parsed.y;
            if (chartType === 'stockLevels') {
              label += ' units';
            } else {
              label += ' products';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: chartType === 'stockLevels' ? 'Products' : 
                chartType === 'categoryDistribution' ? 'Categories' : 'Stock Status',
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
          text: chartType === 'stockLevels' ? 'Stock Quantity' : 'Number of Products',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        borderRadius: 6
      }
    }
  };

  const currentData = barData[chartType];

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (chartType === 'stockLevels') {
      const stockLevels = currentData.datasets[0].data;
      const totalStock = stockLevels.reduce((sum, val) => sum + val, 0);
      const avgStock = totalStock / stockLevels.length;
      const maxStock = Math.max(...stockLevels);
      const minStock = Math.min(...stockLevels);
      
      return {
        totalStock,
        avgStock: avgStock.toFixed(1),
        maxStock,
        minStock
      };
    } else if (chartType === 'categoryDistribution') {
      const totalProducts = currentData.datasets[0].data.reduce((sum, val) => sum + val, 0);
      const mostProducts = Math.max(...currentData.datasets[0].data);
      const leastProducts = Math.min(...currentData.datasets[0].data);
      
      return {
        totalProducts,
        mostProducts,
        leastProducts
      };
    } else {
      const totalProducts = currentData.datasets[0].data.reduce((sum, val) => sum + val, 0);
      const outOfStock = currentData.datasets[0].data[0];
      const lowStock = currentData.datasets[0].data[1];
      const inStock = currentData.datasets[0].data[2];
      const healthScore = Math.round((inStock / totalProducts) * 100);
      
      return {
        totalProducts,
        outOfStock,
        lowStock,
        inStock,
        healthScore
      };
    }
  };

  const summaryStats = getSummaryStats();

  return (
    <div className="w-full">
      {/* Chart Type Selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('stockLevels')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              chartType === 'stockLevels'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Stock Levels
          </button>
          <button
            onClick={() => setChartType('categoryDistribution')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              chartType === 'categoryDistribution'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setChartType('stockHealth')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              chartType === 'stockHealth'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Health
          </button>
        </div>
        
        {/* Update indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">Live Data</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-48 bg-white rounded-lg p-4 border">
        <Bar data={currentData} options={options} height={192} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {chartType === 'stockLevels' && (
          <>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600 font-medium">Total Stock</p>
              <p className="text-lg font-bold text-blue-800">{summaryStats.totalStock}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Average</p>
              <p className="text-lg font-bold text-green-800">{summaryStats.avgStock}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-xs text-purple-600 font-medium">Highest</p>
              <p className="text-lg font-bold text-purple-800">{summaryStats.maxStock}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-600 font-medium">Lowest</p>
              <p className="text-lg font-bold text-red-800">{summaryStats.minStock}</p>
            </div>
          </>
        )}
        {chartType === 'categoryDistribution' && (
          <>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600 font-medium">Total Products</p>
              <p className="text-lg font-bold text-blue-800">{summaryStats.totalProducts}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Most Products</p>
              <p className="text-lg font-bold text-green-800">{summaryStats.mostProducts}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-600 font-medium">Least Products</p>
              <p className="text-lg font-bold text-yellow-800">{summaryStats.leastProducts}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-xs text-purple-600 font-medium">Categories</p>
              <p className="text-lg font-bold text-purple-800">{currentData.labels.length}</p>
            </div>
          </>
        )}
        {chartType === 'stockHealth' && (
          <>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600 font-medium">Total Products</p>
              <p className="text-lg font-bold text-blue-800">{summaryStats.totalProducts}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-600 font-medium">Out of Stock</p>
              <p className="text-lg font-bold text-red-800">{summaryStats.outOfStock}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-xs text-yellow-600 font-medium">Low Stock</p>
              <p className="text-lg font-bold text-yellow-800">{summaryStats.lowStock}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Health Score</p>
              <p className="text-lg font-bold text-green-800">{summaryStats.healthScore}%</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BarChart; 