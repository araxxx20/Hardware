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

function BarChart({ onChartTypeChange, onTimePeriodChange }) {
  const [chartType, setChartType] = useState('suppliesFlow');
  const [salesExpensesView, setSalesExpensesView] = useState('whole');
  const [timePeriod, setTimePeriod] = useState('weekly');
  const [barData, setBarData] = useState({
    suppliesFlow: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Total Stock In',
          data: [15, 22, 18, 25, 20, 28, 24],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
        },
        {
          label: 'Total Stock Out',
          data: [12, 18, 15, 20, 17, 22, 19],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
        },
      ],
    },
    topSellingProducts: {
      labels: ['Pliers', 'Steel Nails', 'Circuit Breaker', 'Electrical Tape', 'Wire Strippers'],
      datasets: [
        {
          label: 'Units Sold',
          data: [85, 72, 68, 45, 38],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 69, 19, 0.8)',
            'rgba(168, 85, 247, 0.8)',
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(139, 69, 19, 1)',
            'rgba(168, 85, 247, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
    salesExpenses: {
      weekly: {
        whole: {
          labels: ['Sales', 'Expenses', 'Profit'],
          datasets: [
            {
              label: 'Amount (₱)',
              data: [45000, 28000, 17000],
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(59, 130, 246, 0.8)',
              ],
              borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        perProduct: {
          labels: ['Pliers', 'Steel Nails', 'Circuit Breaker', 'Electrical Tape'],
          datasets: [
            {
              label: 'Sales (₱)',
              data: [12500, 8500, 18000, 6000],
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 2,
            },
            {
              label: 'Expenses (₱)',
              data: [7500, 5200, 12000, 3300],
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 2,
            },
            {
              label: 'Profit (₱)',
              data: [5000, 3300, 6000, 2700],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
            },
          ],
        },
      },
      monthly: {
        whole: {
          labels: ['Sales', 'Expenses', 'Profit'],
          datasets: [
            {
              label: 'Amount (₱)',
              data: [180000, 112000, 68000],
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(59, 130, 246, 0.8)',
              ],
              borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        perProduct: {
          labels: ['Pliers', 'Steel Nails', 'Circuit Breaker', 'Electrical Tape'],
          datasets: [
            {
              label: 'Sales (₱)',
              data: [50000, 34000, 72000, 24000],
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 2,
            },
            {
              label: 'Expenses (₱)',
              data: [30000, 20800, 48000, 13200],
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 2,
            },
            {
              label: 'Profit (₱)',
              data: [20000, 13200, 24000, 10800],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
            },
          ],
        },
      },
      annual: {
        whole: {
          labels: ['Sales', 'Expenses', 'Profit'],
          datasets: [
            {
              label: 'Amount (₱)',
              data: [2160000, 1344000, 816000],
              backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(59, 130, 246, 0.8)',
              ],
              borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)',
              ],
              borderWidth: 2,
            },
          ],
        },
        perProduct: {
          labels: ['Pliers', 'Steel Nails', 'Circuit Breaker', 'Electrical Tape'],
          datasets: [
            {
              label: 'Sales (₱)',
              data: [600000, 408000, 864000, 288000],
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 2,
            },
            {
              label: 'Expenses (₱)',
              data: [360000, 249600, 576000, 158400],
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 2,
            },
            {
              label: 'Profit (₱)',
              data: [240000, 158400, 288000, 129600],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
            },
          ],
        },
      },
    },
  });

  // Real-time data update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBarData(prevData => {
        const newData = { ...prevData };

        // Update supplies flow with small variations
        newData.suppliesFlow.datasets.forEach(dataset => {
          dataset.data = dataset.data.map(value => {
            const variation = (Math.random() - 0.5) * 0.1; // ±5%
            return Math.max(0, Math.round(value * (1 + variation)));
          });
        });


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
        text: chartType === 'suppliesFlow' ? 'Total Stock In vs Stock Out' :
          chartType === 'topSellingProducts' ? 'Top Selling Products' :
            `Sales & Expenses Analysis (${salesExpensesView === 'whole' ? 'Overall' : 'Per Product'})`,
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
          label: function (context) {
            let label = context.parsed.y;
            if (chartType === 'suppliesFlow') {
              label += ' units';
            } else if (chartType === 'topSellingProducts') {
              label += ' units sold';
            } else if (chartType === 'salesExpenses') {
              label = '₱' + label.toLocaleString();
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
          text: chartType === 'suppliesFlow' ? 'Days of Week' : 'Products',
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
          text: chartType === 'topSellingProducts' ? 'Units Sold' :
            chartType === 'salesExpenses' ? 'Amount (₱)' : 'Quantity (Units)',
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

  const currentData = chartType === 'salesExpenses' ? barData[chartType][timePeriod][salesExpensesView] : barData[chartType];

  // Handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    if (onTimePeriodChange) {
      onTimePeriodChange(period);
    }
  };

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (chartType === 'suppliesFlow') {
      const inflow = currentData.datasets[0].data.reduce((sum, val) => sum + val, 0);
      const outflow = currentData.datasets[1].data.reduce((sum, val) => sum + val, 0);
      const netFlow = inflow - outflow;
      const efficiency = Math.round((outflow / inflow) * 100);

      return {
        totalInflow: inflow,
        totalOutflow: outflow,
        netFlow,
        efficiency
      };
    } else if (chartType === 'topSellingProducts') {
      const sales = currentData.datasets[0].data;
      const totalSales = sales.reduce((sum, val) => sum + val, 0);
      const avgSales = Math.round(totalSales / sales.length);
      const topProduct = currentData.labels[sales.indexOf(Math.max(...sales))];
      const topProductSales = Math.max(...sales);

      return {
        totalSales,
        avgSales,
        topProduct,
        topProductSales
      };
    } else if (chartType === 'salesExpenses') {
      if (salesExpensesView === 'whole') {
        const [sales, expenses, profit] = currentData.datasets[0].data;
        return {
          totalSales: sales,
          totalExpenses: expenses,
          totalProfit: profit,
          profitMargin: Math.round((profit / sales) * 100)
        };
      } else {
        const salesData = currentData.datasets[0].data;
        const expensesData = currentData.datasets[1].data;
        const profitData = currentData.datasets[2].data;

        return {
          totalSales: salesData.reduce((sum, val) => sum + val, 0),
          totalExpenses: expensesData.reduce((sum, val) => sum + val, 0),
          totalProfit: profitData.reduce((sum, val) => sum + val, 0),
          avgSalesPerProduct: Math.round(salesData.reduce((sum, val) => sum + val, 0) / salesData.length),
          avgExpensesPerProduct: Math.round(expensesData.reduce((sum, val) => sum + val, 0) / expensesData.length),
          avgProfitPerProduct: Math.round(profitData.reduce((sum, val) => sum + val, 0) / profitData.length)
        };
      }
    }
  };

  const summaryStats = getSummaryStats();

  return (
    <div className="w-full">
      {/* Chart Type Selector */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setChartType('suppliesFlow');
              onChartTypeChange && onChartTypeChange('suppliesFlow');
            }}
            className={`px-2 sm:px-3 py-1 rounded text-xs font-medium transition-colors ${chartType === 'suppliesFlow'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Supplies Flow
          </button>
          <button
            onClick={() => {
              setChartType('topSellingProducts');
              onChartTypeChange && onChartTypeChange('topSellingProducts');
            }}
            className={`px-2 sm:px-3 py-1 rounded text-xs font-medium transition-colors ${chartType === 'topSellingProducts'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Top Products
          </button>
          <button
            onClick={() => {
              setChartType('salesExpenses');
              onChartTypeChange && onChartTypeChange('salesExpenses');
            }}
            className={`px-2 sm:px-3 py-1 rounded text-xs font-medium transition-colors ${chartType === 'salesExpenses'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Sales & Expenses
          </button>
        </div>

        {/* Controls for Sales & Expenses */}
        {chartType === 'salesExpenses' && (
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
            {/* Time Period Dropdown */}
            <select
              value={timePeriod}
              onChange={(e) => handleTimePeriodChange(e.target.value)}
              className="text-xs bg-white border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            >
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly View</option>
              <option value="annual">Annual View</option>
            </select>

            {/* View Toggle */}
            <select
              className="text-xs bg-white border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
              onChange={(e) => setSalesExpensesView(e.target.value)}
              value={salesExpensesView}
            >
              <option value="whole">Overall View</option>
              <option value="perProduct">Per Product</option>
            </select>
          </div>
        )}

      </div>

      {/* Chart */}
      <div className="w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg p-2 sm:p-4 border">
        <Bar data={currentData} options={options} height={192} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4">
        {chartType === 'suppliesFlow' && (
          <>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Total Stock In</p>
              <p className="text-lg font-bold text-green-800">{summaryStats.totalInflow}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-600 font-medium">Total Stock Out</p>
              <p className="text-lg font-bold text-red-800">{summaryStats.totalOutflow}</p>
            </div>
          </>
        )}
        {chartType === 'topSellingProducts' && (
          <>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600 font-medium">Total Sales</p>
              <p className="text-lg font-bold text-blue-800">{summaryStats.totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Average Sales</p>
              <p className="text-lg font-bold text-green-800">{summaryStats.avgSales.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-xs text-purple-600 font-medium">Top Product</p>
              <p className="text-sm font-bold text-purple-800">{summaryStats.topProduct}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-xs text-orange-600 font-medium">Top Sales</p>
              <p className="text-lg font-bold text-orange-800">{summaryStats.topProductSales}</p>
            </div>
          </>
        )}
        {chartType === 'salesExpenses' && (
          <>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 font-medium">Total Sales</p>
              <p className="text-lg font-bold text-green-800">₱{summaryStats.totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-xs text-red-600 font-medium">Total Expenses</p>
              <p className="text-lg font-bold text-red-800">₱{summaryStats.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-600 font-medium">Total Profit</p>
              <p className="text-lg font-bold text-blue-800">₱{summaryStats.totalProfit.toLocaleString()}</p>
            </div>
            {salesExpensesView === 'whole' && (
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-xs text-purple-600 font-medium">Profit Margin</p>
                <p className="text-lg font-bold text-purple-800">{summaryStats.profitMargin}%</p>
              </div>
            )}
            {salesExpensesView === 'perProduct' && (
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <p className="text-xs text-yellow-600 font-medium">Avg Profit/Product</p>
                <p className="text-lg font-bold text-yellow-800">₱{summaryStats.avgProfitPerProduct.toLocaleString()}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BarChart;