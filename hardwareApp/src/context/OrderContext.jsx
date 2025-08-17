import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    { 
      id: 1,
      customerName: "Sarah Wilson",
      customerPhone: "+63 912 345 6789",
      customerAddress: "123 Main St, Quezon City, Metro Manila",
      productName: "Steel Nails",
      quantity: 5,
      unit: "Kilograms",
      status: "Pending",
      orderDate: "2024-01-15",
      totalAmount: "₱1,250.00"
    },
    { 
      id: 2,
      customerName: "Michael Santos",
      customerPhone: "+63 923 456 7890",
      customerAddress: "456 Oak Ave, Makati City, Metro Manila",
      productName: "Circuit Breaker",
      quantity: 2,
      unit: "Pieces",
      status: "Processing",
      orderDate: "2024-01-14",
      totalAmount: "₱3,800.00"
    },
    { 
      id: 3,
      customerName: "Maria Garcia",
      customerPhone: "+63 934 567 8901",
      customerAddress: "789 Pine Rd, Taguig City, Metro Manila",
      productName: "Electrical Tape",
      quantity: 10,
      unit: "Pieces",
      status: "Completed",
      orderDate: "2024-01-13",
      totalAmount: "₱450.00"
    },
    { 
      id: 4,
      customerName: "Robert Cruz",
      customerPhone: "+63 945 678 9012",
      customerAddress: "321 Elm St, Pasig City, Metro Manila",
      productName: "Pliers",
      quantity: 3,
      unit: "Pieces",
      status: "Cancelled",
      orderDate: "2024-01-12",
      totalAmount: "₱1,200.00"
    },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const getOrderStats = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    return {
      totalOrders: orders.length,
      activeOrders: orders.filter(order => 
        order.status === "Pending" || order.status === "Processing" || order.status === "Shipped"
      ).length,
      pendingDeliveries: orders.filter(order => 
        order.status === "Processing" || order.status === "Shipped"
      ).length,
      todayRevenue: orders
        .filter(order => order.orderDate === today)
        .reduce((sum, order) => {
          const amount = parseFloat(order.totalAmount.replace('₱', '').replace(',', ''));
          return sum + amount;
        }, 0),
      completedOrders: orders.filter(order => order.status === "Completed").length,
      cancelledOrders: orders.filter(order => order.status === "Cancelled").length,
      statusBreakdown: {
        pending: orders.filter(order => order.status === "Pending").length,
        processing: orders.filter(order => order.status === "Processing").length,
        shipped: orders.filter(order => order.status === "Shipped").length,
        completed: orders.filter(order => order.status === "Completed").length,
        cancelled: orders.filter(order => order.status === "Cancelled").length
      }
    };
  };

  const getTodayOrders = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(order => order.orderDate === today);
  };

  const getRecentOrders = (count = 5) => {
    return orders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, count);
  };

  const value = {
    orders,
    updateOrderStatus,
    getOrderStats,
    getTodayOrders,
    getRecentOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
