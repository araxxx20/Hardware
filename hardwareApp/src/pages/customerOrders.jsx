import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Swal from 'sweetalert2';
import { Search, Pencil, Eye, Package, Clock, CheckCircle, XCircle, ShoppingCart } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

function CustomerReservations() {
  const { orders, updateOrderStatus } = useOrders();

  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('reservations');

  // Edit reservation status
  const handleEditStatus = (e) => {
    e.preventDefault();
    const form = e.target;
    const newStatus = form.status.value;

    updateOrderStatus(currentOrder.id, newStatus);
    setShowEditStatusModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Status Updated',
      text: `${activeTab === 'reservations' ? 'Reservation' : 'Order'} status has been updated to ${newStatus}.`,
      timer: 2000,
      showConfirmButton: false
    });
  };


  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Reserved': 'bg-blue-100 text-blue-800',
      'Ready': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Completed': 'bg-purple-100 text-purple-800'
    };
    
    return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  // Get display status text based on active tab
  const getDisplayStatus = (status) => {
    if (activeTab === 'orders') {
      switch(status) {
        case 'Reserved': return 'Processing';
        case 'Ready': return 'Shipped';
        default: return status;
      }
    }
    return status === 'Ready' ? 'Ready for Pickup' : status;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={14} />;
      case 'Reserved': return <Package size={14} />;
      case 'Ready': return <CheckCircle size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      case 'Completed': return <CheckCircle size={14} />;
      default: return <Package size={14} />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeTab === 'reservations' 
      ? (order.type === 'reservation' || !order.type) // backward compatibility
      : order.type === 'order';
    
    return matchesSearch && matchesType;
  });

  const currentTypeOrders = orders.filter(order => 
    activeTab === 'reservations' 
      ? (order.type === 'reservation' || !order.type)
      : order.type === 'order'
  );

  const statusCounts = {
    total: currentTypeOrders.length,
    pending: currentTypeOrders.filter(o => o.status === 'Pending').length,
    reserved: currentTypeOrders.filter(o => o.status === 'Reserved').length,
    ready: currentTypeOrders.filter(o => o.status === 'Ready').length,
    completed: currentTypeOrders.filter(o => o.status === 'Completed').length,
    cancelled: currentTypeOrders.filter(o => o.status === 'Cancelled').length
  };

  return (
    <Navbar>
      <main className="flex-1 p-4 sm:p-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'reservations'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Package className="inline-block w-4 h-4 mr-2" />
                Customer Reservations
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ShoppingCart className="inline-block w-4 h-4 mr-2" />
                Customer Orders
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-blue-500 font-medium mb-2">Total {activeTab === 'reservations' ? 'Reservations' : 'Orders'}</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.total}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-yellow-500 font-medium mb-2">Pending</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.pending}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-blue-500 font-medium mb-2">{activeTab === 'reservations' ? 'Reserved' : 'Processing'}</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.reserved}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-green-500 font-medium mb-2">{activeTab === 'reservations' ? 'Ready' : 'Shipped'}</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.ready}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-purple-500 font-medium mb-2">Completed</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.completed}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col">
            <span className="text-red-500 font-medium mb-2">Cancelled</span>
            <span className="text-2xl font-bold mb-3">{statusCounts.cancelled}</span>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {activeTab === 'reservations' ? 'Customer Reservations' : 'Customer Orders'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
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
                  <th className="px-4 py-2 whitespace-nowrap">{activeTab === 'reservations' ? 'Product Reserved' : 'Product Ordered'}</th>
                  <th className="px-4 py-2 whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">{activeTab === 'reservations' ? 'Reservation Date' : 'Order Date'}</th>
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
                        {getDisplayStatus(order.status)}
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
                        title={`Edit ${activeTab === 'reservations' ? 'Reservation' : 'Order'} Status`}
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
          <Modal title={`Edit ${activeTab === 'reservations' ? 'Reservation' : 'Order'} Status - ${currentOrder.customerName}`} onClose={() => setShowEditStatusModal(false)}>
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
                  <option value="Reserved">{activeTab === 'reservations' ? 'Reserved' : 'Processing'}</option>
                  <option value="Ready">{activeTab === 'reservations' ? 'Ready for Pickup' : 'Shipped'}</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditStatusModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
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
                <h4 className="font-semibold text-gray-800 mb-3">{activeTab === 'reservations' ? 'Reservation' : 'Order'} Details</h4>
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
                    <span className="font-medium text-gray-600">{activeTab === 'reservations' ? 'Reservation' : 'Order'} Date:</span>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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

export default CustomerReservations;
