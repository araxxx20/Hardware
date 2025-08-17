import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import SmallBarChart from '../components/barchart';
import { useInventory } from '../context/InventoryContext';
import { useOrders } from '../context/OrderContext';

function Dashboard() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showAllStock, setShowAllStock] = useState(false); 

  // Use shared inventory data from context
  const { getLowStockItems, getInventoryStats, products } = useInventory();
  
  // Use shared order data from context
  const { getOrderStats } = useOrders();
  
  const lowStockItems = getLowStockItems();
  const inventoryStats = getInventoryStats();
  const orderStats = getOrderStats();
  const displayedItems = showAllStock ? lowStockItems : lowStockItems.slice(0, 5);

  // Calculate descriptive analytics for product trends
  const getDescriptiveAnalytics = () => {
    const analytics = {
      // Basic Statistics
      totalProducts: products.length,
      averageStockLevel: products.reduce((sum, p) => sum + p.qty, 0) / products.length,
      medianStockLevel: products.sort((a, b) => a.qty - b.qty)[Math.floor(products.length / 2)]?.qty || 0,
      maxStockLevel: Math.max(...products.map(p => p.qty)),
      minStockLevel: Math.min(...products.map(p => p.qty)),
      
      // Stock Distribution
      stockDistribution: {
        zero: products.filter(p => p.qty === 0).length,
        low: products.filter(p => p.qty > 0 && p.qty < 5).length,
        medium: products.filter(p => p.qty >= 5 && p.qty < 10).length,
        high: products.filter(p => p.qty >= 10).length
      },
      
      // Top Performers
      topPerformers: products.sort((a, b) => b.qty - a.qty).slice(0, 3),
      
      // Stock Health Score
      stockHealthScore: Math.round((products.filter(p => p.status === "In-stock").length / products.length) * 100)
    };

    return analytics;
  };

  const analytics = getDescriptiveAnalytics();

  return (
    <Navbar>
        <main className="flex-1 p-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Annual Sales</span>
                <span className="text-2xl font-bold mb-1">₱100,689</span>
                <span className="text-green-500 text-sm font-medium">▲ 50% Up from 2024</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Monthly Sales</span>
                <span className="text-2xl font-bold mb-1">₱50,293</span>
                <span className="text-green-500 text-sm font-medium">▲ 1.3% Up from past month</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Daily Sales</span>
                <span className="text-2xl font-bold mb-1">₱{orderStats.todayRevenue.toLocaleString()}</span>
                <span className="text-green-500 text-sm font-medium">▲ 4.3% Up from yesterday</span>
            </div>
            </div>

           {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Details and Product Sales */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Main Sales Trend Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Product Sales Trend</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 font-medium">Live Data</span>
                </div>
              </div>
              <Chart />
            </div>

            {/* Descriptive Analytics */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Product Trend Analytics</h3>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                >
                  {showMoreDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              {showMoreDetails && (
                <div className="space-y-4">
                  <SmallBarChart />
                  
                  {/* Statistical Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Statistical Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Total Products</span>
                          <span className="text-sm font-bold">{analytics.totalProducts}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Average Stock Level</span>
                          <span className="text-sm font-bold">{analytics.averageStockLevel.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Median Stock Level</span>
                          <span className="text-sm font-bold">{analytics.medianStockLevel}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Max Stock Level</span>
                          <span className="text-sm font-bold text-green-600">{analytics.maxStockLevel}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Min Stock Level</span>
                          <span className="text-sm font-bold text-red-600">{analytics.minStockLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Stock Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Zero Stock</span>
                          <span className="text-sm font-bold text-red-600">{analytics.stockDistribution.zero}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Low Stock (1-4)</span>
                          <span className="text-sm font-bold text-yellow-600">{analytics.stockDistribution.low}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">Medium Stock (5-9)</span>
                          <span className="text-sm font-bold text-blue-600">{analytics.stockDistribution.medium}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm text-gray-600">High Stock (10+)</span>
                          <span className="text-sm font-bold text-green-600">{analytics.stockDistribution.high}</span>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Stock Health Score</span>
                            <span className="text-sm font-bold text-blue-600">{analytics.stockHealthScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Top Performers</h4>
                    <div className="space-y-2">
                      {analytics.topPerformers.map((product, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-2 rounded">
                          <span className="text-sm font-medium">{product.name}</span>
                          <span className="text-sm text-green-600 font-bold">{product.qty} {product.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Inventory Status */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg">Inventory Status</h4>
                <div className="text-xs text-gray-500">
                  {inventoryStats.totalProducts} Total Products
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{inventoryStats.inStockCount}</div>
                  <div className="text-xs text-gray-600">In Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStockCount}</div>
                  <div className="text-xs text-gray-600">Low Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{inventoryStats.outOfStockCount}</div>
                  <div className="text-xs text-gray-600">Out of Stock</div>
                </div>
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg">Stock Alerts</h4>
                <button
                  onClick={() => setShowAllStock(!showAllStock)}
                  className="text-blue-500 text-sm focus:outline-none hover:text-blue-700"
                >
                  {showAllStock ? "Show Less" : "See All"}
                </button>
              </div>
              <ul className="divide-y">
                {displayedItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.qty} {item.unit} • {item.category}
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      item.status === "Out of stock" 
                        ? "text-red-600 bg-red-100" 
                        : "text-yellow-600 bg-yellow-100"
                    }`}>
                      {item.status === "Out of stock" ? "Out" : "Low"}
                    </span>
                  </li>
                ))}
              </ul>
              {!showAllStock && lowStockItems.length > 5 && (
                <p className="text-xs text-gray-500 mt-2">+{lowStockItems.length - 5} more items</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="font-bold text-lg mb-4">Orders</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Products</span>
                  <span className="font-semibold">{inventoryStats.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Orders</span>
                  <span className="font-semibold text-blue-600">{orderStats.activeOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Deliveries</span>
                  <span className="font-semibold text-orange-600">{orderStats.pendingDeliveries}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        </main>
    </Navbar>
  );
}

export default Dashboard;