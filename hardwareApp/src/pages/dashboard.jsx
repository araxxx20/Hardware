import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import PieChart from '../components/piechart';
import SmallBarChart from '../components/barchart';

function Dashboard() {
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

               {/* Summary Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-blue-500 font-medium mb-2">Total Cost</span>
    <span className="text-2xl font-bold mb-3">50,000</span>

  </div>
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-yellow-500 font-medium mb-2">Total Profit</span>
    <span className="text-2xl font-bold mb-3">100,000</span>
  </div>

  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-red-500 font-medium mb-2">Total Revenue</span>
    <span className="text-2xl font-bold mb-3">25,000</span>
    
  </div>
</div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Details and Product Sales */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Sales Details */}
                <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Financial Analysis</h3>
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-green-700 rounded">More Details</button>
                </div>
                <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {/* Replace with chart component */}
                    <Chart />
                </div>
                </div>
               
            </div>
            {/* Order Types Pie Chart and Low Quantity Stock */}
            <div className="flex flex-col gap-6">
                
                {/* Low Quantity Stock */}
                <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Low Quantity Stock</h4>
                    <a href="#" className="text-blue-500 text-sm">See All</a>
                </div>
                <ul className="divide-y">
                    <li className="flex justify-between py-1">10 watts Bulb <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Pliers <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Electrical tape <span className="text-red-500 text-xs font-bold">Low</span></li>
                
                </ul>
                </div>
            </div>
            </div>
        </main>

    </Navbar>
  );
}

export default Dashboard;