import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Swal from 'sweetalert2';
import { Search, Pencil, Eye, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

function CustomerOrders() {
  const { orders, updateOrderStatus } = useOrders();

  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Edit order status
  const handleEditStatus = (e) => {
    e.preventDefault();
    const form = e.target;
    const newStatus = form.status.value;
    
    updateOrderStatus(currentOrder.id, newStatus);
    setShowEditStatusModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Status Updated',
      text: `Order status has been updated to ${newStatus}.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Shipped': 'bg-purple-100 text-purple-800'
    };
    
    return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={14} />;
      case 'Processing': return <Package size={14} />;
      case 'Completed': return <CheckCircle size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return <Package size={14} />;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
  };

  return (
    <Navbar>
      <main className="flex-1 p-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-blue-500 font-medium mb-2">Total Orders</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.total}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-yellow-500 font-medium mb-2">Pending</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.pending}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-blue-500 font-medium mb-2">Processing</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.processing}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-green-500 font-medium mb-2">Completed</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.completed}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-red-500 font-medium mb-2">Cancelled</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.cancelled}</span>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Customer Orders</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full sm:w-auto pl-8 pr-3 py-2 border rounded text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">Customer Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Product Ordered</th>
                  <th className="px-4 py-2 whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Order Date</th>
                  <th className="px-4 py-2 whitespace-nowrap">Total Amount</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2 font-medium">{order.customerName}</td>
                    <td className="px-4 py-2">{order.productName}</td>
                    <td className="px-4 py-2">
                      {order.quantity} {order.unit}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center gap-1 ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{order.orderDate}</td>
                    <td className="px-4 py-2 font-semibold">{order.totalAmount}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setCurrentOrder(order);
                          setShowCustomerInfoModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Customer Info"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentOrder(order);
                          setShowEditStatusModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="Edit Status"
                      >
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Status Modal */}
        {showEditStatusModal && currentOrder && (
          <Modal title={`Edit Order Status - ${currentOrder.customerName}`} onClose={() => setShowEditStatusModal(false)}>
            <form onSubmit={handleEditStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status: <span className="font-semibold">{currentOrder.status}</span>
                </label>
                <select 
                  name="status" 
                  required 
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select New Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowEditStatusModal(false)} 
                  className="btn bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn bg-green-600 text-gray"
                >
                  Update Status
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Customer Info Modal */}
        {showCustomerInfoModal && currentOrder && (
          <Modal title={`Customer Information - ${currentOrder.customerName}`} onClose={() => setShowCustomerInfoModal(false)}>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Order Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Product:</span>
                    <p className="text-gray-800">{currentOrder.productName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Quantity:</span>
                    <p className="text-gray-800">{currentOrder.quantity} {currentOrder.unit}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Order Date:</span>
                    <p className="text-gray-800">{currentOrder.orderDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Total Amount:</span>
                    <p className="text-gray-800 font-semibold">{currentOrder.totalAmount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Customer Information</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-blue-600">Full Name:</span>
                    <p className="text-blue-800 font-semibold">{currentOrder.customerName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-600">Phone Number:</span>
                    <p className="text-blue-800">{currentOrder.customerPhone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-600">Address:</span>
                    <p className="text-blue-800">{currentOrder.customerAddress}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowCustomerInfoModal(false)} 
                  className="btn bg-blue-600 text-gray"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </Navbar>
  );
}

// Reusable Modal Component
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default CustomerOrders;
