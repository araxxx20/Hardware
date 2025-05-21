import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import PieChart from '../components/piechart';
import SmallBarChart from '../components/barchart';

function Dashboard() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showAllStock, setShowAllStock] = useState(false); 

 
  const lowStockItems = [
    "10 watts Bulb",
    "Pliers",
    "Electrical tape",
    "Wire Cutter",
    "Screwdriver",
    "Voltage Tester",
    "Circuit Breaker",
    "Multimeter",
  ];

  const displayedItems = showAllStock ? lowStockItems : lowStockItems.slice(0, 3);

  return (
    <Navbar>
        <main className="flex-1 p-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Anual Sales</span>
                <span className="text-2xl font-bold mb-1">100,689</span>
                <span className="text-green-500 text-sm font-medium">▲ 50% Up from 2024</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Monthly Sales</span>
                <span className="text-2xl font-bold mb-1">50,293</span>
                <span className="text-green-500 text-sm font-medium">▲ 1.3% Up from past month</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Daily Sales</span>
                <span className="text-2xl font-bold mb-1">10,000</span>
                <span className="text-red-500 text-sm font-medium">▼ 4.3% Down from yesterday</span>
            </div>
           
            </div>

           {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Details and Product Sales */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Sales Details */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Product Sales Trend</h3>
                <button
                  className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-700 rounded"
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                >
                  {showMoreDetails ? 'Less Details' : 'More Details'}
                </button>
              </div>
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                <Chart />
              </div>

              {showMoreDetails && (
                <div className="mt-6 space-y-4">
                  <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center text-gray-500 border">
                    <SmallBarChart />
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Detailed analysis of product sales, category breakdown, and time-based performance trends.
                  </p>
                </div>
              )}
            </div>
          </div>

                  {/* Low Quantity Stock */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">Low Quantity Stock</h4>
              <button
                onClick={() => setShowAllStock(!showAllStock)}
                className="text-blue-500 text-sm focus:outline-none"
              >
                {showAllStock ? "Collapse" : "See All"}
              </button>
            </div>
            <ul className="divide-y">
              {displayedItems.map((item, index) => (
                <li key={index} className="flex justify-between py-1">
                  {item} <span className="text-red-500 text-xs font-bold">Low</span>
                </li>
              ))}
            </ul>
          </div>
            
            </div>
        </main>

    </Navbar>
  );
}

export default Dashboard;