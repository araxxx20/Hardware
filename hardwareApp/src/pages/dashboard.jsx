import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import SmallBarChart from '../components/barchart';
import { useInventory } from '../context/InventoryContext';
import { useOrders } from '../context/OrderContext';

function Dashboard() {
  const [showAllStock, setShowAllStock] = useState(false);
  const [flowView, setFlowView] = useState('whole');
  const [selectedChartType, setSelectedChartType] = useState('suppliesFlow');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('weekly');

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

  // Calculate supplies trend analytics
  const getSuppliesAnalytics = () => {
    // Simulate supplies data with inflow/outflow trends
    const currentDate = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const analytics = {
      // Supplies Stock Data
      suppliesStockIn: [15, 22, 18, 25, 20, 28, 24], // Daily stock in
      suppliesStockOut: [12, 18, 15, 20, 17, 22, 19], // Daily stock out

      // Total Summary
      totalStock: 152,
      totalStockOut: 123,

      // Trend Analysis
      stockTrend: 'increasing',
      stockOutTrend: 'stable',

      // Per Product Stock Data
      productStock: {
        whole: {
          stock: 152,
          stockOut: 123
        },
        perProduct: [
          { name: 'Pliers', stock: 45, stockOut: 38 },
          { name: 'Steel Nails', stock: 52, stockOut: 42 },
          { name: 'Circuit Breaker', stock: 35, stockOut: 28 },
          { name: 'Electrical Tape', stock: 20, stockOut: 15 }
        ]
      },

      // Time labels
      timeLabels: last7Days
    };

    return analytics;
  };

  // Calculate expense analytics
  const getExpenseAnalytics = () => {
    const expenses = {
      // Per product expenses (sample data)
      productExpenses: [
        { name: 'Pliers', cost: 1250, qty: 25, unitCost: 50 },
        { name: 'Steel Nails', cost: 800, qty: 100, unitCost: 8 },
        { name: 'Circuit Breaker', cost: 3000, qty: 15, unitCost: 200 },
        { name: 'Electrical Tape', cost: 450, qty: 30, unitCost: 15 }
      ],

      // Total expenses
      totalExpenses: 5500,
      averageUnitCost: 68.25,
      highestExpense: 3000,
      lowestExpense: 450,

      // Monthly comparison
      thisMonth: 5500,
      lastMonth: 4800,
      monthlyChange: 14.6
    };

    return expenses;
  };

  // Calculate top selling products analytics
  const getTopSellingProducts = () => {
    const topProducts = {
      // Top selling products data
      products: [
        { name: 'Pliers', unitsSold: 85, revenue: 4250, trend: 'up' },
        { name: 'Steel Nails', unitsSold: 72, revenue: 576, trend: 'up' },
        { name: 'Circuit Breaker', unitsSold: 68, revenue: 13600, trend: 'stable' },
        { name: 'Electrical Tape', unitsSold: 45, revenue: 675, trend: 'down' },
        { name: 'Wire Strippers', unitsSold: 38, revenue: 1140, trend: 'up' }
      ],

      // Summary stats
      totalUnitsSold: 308,
      totalRevenue: 20241,
      averageUnitsPerProduct: 62,
      topProduct: 'Pliers',
      topProductSales: 85
    };

    return topProducts;
  };

  // Calculate sales and expenses analytics
  const getSalesExpensesAnalytics = () => {
    const salesExpensesAnalytics = {
      weekly: {
        totalSales: 45000,
        totalExpenses: 28000,
        totalProfit: 17000,
        profitMargin: 38,
        monthlyGrowth: {
          sales: 12,
          expenses: 8,
          profit: 15
        },
        thisMonth: {
          sales: 45000,
          expenses: 28000,
          profit: 17000
        },
        lastMonth: {
          sales: 40000,
          expenses: 26000,
          profit: 14000
        },
        productBreakdown: [
          { name: 'Pliers', sales: 12500, expenses: 7500, profit: 5000, margin: 40 },
          { name: 'Steel Nails', sales: 8500, expenses: 5200, profit: 3300, margin: 39 },
          { name: 'Circuit Breaker', sales: 18000, expenses: 12000, profit: 6000, margin: 33 },
          { name: 'Electrical Tape', sales: 6000, expenses: 3300, profit: 2700, margin: 45 }
        ]
      },
      monthly: {
        totalSales: 180000,
        totalExpenses: 112000,
        totalProfit: 68000,
        profitMargin: 38,
        monthlyGrowth: {
          sales: 15,
          expenses: 10,
          profit: 18
        },
        thisMonth: {
          sales: 180000,
          expenses: 112000,
          profit: 68000
        },
        lastMonth: {
          sales: 156000,
          expenses: 102000,
          profit: 54000
        },
        productBreakdown: [
          { name: 'Pliers', sales: 50000, expenses: 30000, profit: 20000, margin: 40 },
          { name: 'Steel Nails', sales: 34000, expenses: 20800, profit: 13200, margin: 39 },
          { name: 'Circuit Breaker', sales: 72000, expenses: 48000, profit: 24000, margin: 33 },
          { name: 'Electrical Tape', sales: 24000, expenses: 13200, profit: 10800, margin: 45 }
        ]
      },
      annual: {
        totalSales: 2160000,
        totalExpenses: 1344000,
        totalProfit: 816000,
        profitMargin: 38,
        monthlyGrowth: {
          sales: 18,
          expenses: 12,
          profit: 22
        },
        thisMonth: {
          sales: 2160000,
          expenses: 1344000,
          profit: 816000
        },
        lastMonth: {
          sales: 1830000,
          expenses: 1200000,
          profit: 630000
        },
        productBreakdown: [
          { name: 'Pliers', sales: 600000, expenses: 360000, profit: 240000, margin: 40 },
          { name: 'Steel Nails', sales: 408000, expenses: 249600, profit: 158400, margin: 39 },
          { name: 'Circuit Breaker', sales: 864000, expenses: 576000, profit: 288000, margin: 33 },
          { name: 'Electrical Tape', sales: 288000, expenses: 158400, profit: 129600, margin: 45 }
        ]
      }
    };

    return salesExpensesAnalytics;
  };

  const suppliesAnalytics = getSuppliesAnalytics();
  const topSellingProducts = getTopSellingProducts();
  const salesExpensesAnalytics = getSalesExpensesAnalytics();
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


            {/* Supplies Trend Analytics */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Descriptive Analytics</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <SmallBarChart
                    onChartTypeChange={setSelectedChartType}
                    onTimePeriodChange={setSelectedTimePeriod}
                  />

                  {/* Dynamic Content Based on Chart Selection */}
                  {selectedChartType === 'suppliesFlow' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-gray-800">Stock Movement (7 Days)</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Stock</span>
                            <span className="text-sm font-bold text-green-600">{suppliesAnalytics.totalStock} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Stock Out</span>
                            <span className="text-sm font-bold text-red-600">{suppliesAnalytics.totalStockOut} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Stock Trend</span>
                            <span className="text-sm font-bold text-green-600">↗ {suppliesAnalytics.stockTrend}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Stock Out Trend</span>
                            <span className="text-sm font-bold text-blue-600">→ {suppliesAnalytics.stockOutTrend}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Weekly Flow Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Weekly Stock In</span>
                            <span className="text-sm font-bold text-green-600">{suppliesAnalytics.totalStock} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Weekly Stock Out</span>
                            <span className="text-sm font-bold text-red-600">{suppliesAnalytics.totalStockOut} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Net Flow</span>
                            <span className="text-sm font-bold text-blue-600">{suppliesAnalytics.totalStock - suppliesAnalytics.totalStockOut} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Flow Efficiency</span>
                            <span className="text-sm font-bold text-purple-600">{Math.round((suppliesAnalytics.totalStockOut / suppliesAnalytics.totalStock) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedChartType === 'topSellingProducts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Top Selling Products</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Units Sold</span>
                            <span className="text-sm font-bold text-blue-600">{topSellingProducts.totalUnitsSold} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Revenue</span>
                            <span className="text-sm font-bold text-green-600">₱{topSellingProducts.totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Average per Product</span>
                            <span className="text-sm font-bold text-purple-600">{topSellingProducts.averageUnitsPerProduct} units</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Top Product</span>
                            <span className="text-sm font-bold text-orange-600">{topSellingProducts.topProduct}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Top Sales</span>
                            <span className="text-sm font-bold text-red-600">{topSellingProducts.topProductSales} units</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Product Rankings</h4>
                        <div className="space-y-2">
                          {topSellingProducts.products.slice(0, 5).map((product, index) => (
                            <div key={index} className="bg-white p-2 rounded">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">#{index + 1} {product.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-blue-600 font-bold">{product.unitsSold} units</span>
                                  <span className={`text-xs ${product.trend === 'up' ? 'text-green-600' :
                                    product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Revenue: ₱{product.revenue.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedChartType === 'salesExpenses' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Sales & Expenses Summary ({selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)})</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Sales</span>
                            <span className="text-sm font-bold text-green-600">₱{salesExpensesAnalytics[selectedTimePeriod].totalSales.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Expenses</span>
                            <span className="text-sm font-bold text-red-600">₱{salesExpensesAnalytics[selectedTimePeriod].totalExpenses.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Total Profit</span>
                            <span className="text-sm font-bold text-blue-600">₱{salesExpensesAnalytics[selectedTimePeriod].totalProfit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Profit Margin</span>
                            <span className="text-sm font-bold text-purple-600">{salesExpensesAnalytics[selectedTimePeriod].profitMargin}%</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm text-gray-600">Growth</span>
                            <span className="text-sm font-bold text-green-600">+{salesExpensesAnalytics[selectedTimePeriod].monthlyGrowth.profit}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Period Comparison</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-3 rounded">
                            <h5 className="text-sm font-semibold text-blue-800 mb-2">Current {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}</h5>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-blue-600">Sales:</span>
                                <span className="font-bold text-blue-800">₱{salesExpensesAnalytics[selectedTimePeriod].thisMonth.sales.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-600">Expenses:</span>
                                <span className="font-bold text-blue-800">₱{salesExpensesAnalytics[selectedTimePeriod].thisMonth.expenses.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-600">Profit:</span>
                                <span className="font-bold text-blue-800">₱{salesExpensesAnalytics[selectedTimePeriod].thisMonth.profit.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-100 p-3 rounded">
                            <h5 className="text-sm font-semibold text-gray-800 mb-2">Previous {selectedTimePeriod.charAt(0).toUpperCase() + selectedTimePeriod.slice(1)}</h5>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Sales:</span>
                                <span className="font-bold text-gray-800">₱{salesExpensesAnalytics[selectedTimePeriod].lastMonth.sales.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Expenses:</span>
                                <span className="font-bold text-gray-800">₱{salesExpensesAnalytics[selectedTimePeriod].lastMonth.expenses.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Profit:</span>
                                <span className="font-bold text-gray-800">₱{salesExpensesAnalytics[selectedTimePeriod].lastMonth.profit.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Performance Breakdown - Show for salesExpenses and suppliesFlow only */}
                  {(selectedChartType === 'salesExpenses' || selectedChartType === 'suppliesFlow') && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">
                        {selectedChartType === 'salesExpenses' ? 'Product Performance Breakdown' : 'Product Stock Performance'}
                      </h4>
                      <div className="space-y-2">
                        {selectedChartType === 'salesExpenses' && salesExpensesAnalytics[selectedTimePeriod].productBreakdown.map((product, index) => (
                          <div key={index} className="bg-white p-3 rounded">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{product.name}</span>
                              <span className="text-xs font-bold text-blue-600">{product.margin}% margin</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <p className="text-green-600 font-medium">Sales</p>
                                <p className="font-bold text-green-800">₱{product.sales.toLocaleString()}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-red-600 font-medium">Expenses</p>
                                <p className="font-bold text-red-800">₱{product.expenses.toLocaleString()}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-blue-600 font-medium">Profit</p>
                                <p className="font-bold text-blue-800">₱{product.profit.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {selectedChartType === 'suppliesFlow' && suppliesAnalytics.productStock.perProduct.map((product, index) => (
                          <div key={index} className="bg-white p-3 rounded">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{product.name}</span>
                              <span className="text-xs font-bold text-blue-600">{Math.round((product.stockOut / product.stock) * 100)}% flow rate</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="text-center">
                                <p className="text-green-600 font-medium">Stock In</p>
                                <p className="font-bold text-green-800">{product.stock} units</p>
                              </div>
                              <div className="text-center">
                                <p className="text-red-600 font-medium">Stock Out</p>
                                <p className="font-bold text-red-800">{product.stockOut} units</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === "Out of stock"
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