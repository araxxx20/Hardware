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
    // Customer Reservations (type: 'reservation' or undefined for backward compatibility)
    { 
      id: 1,
      customerName: "Sarah Wilson",
      customerPhone: "+63 912 345 6789",
      customerAddress: "123 Main St, Quezon City, Metro Manila",
      productName: "Steel Nails",
      quantity: 5,
      unit: "kg",
      status: "Pending",
      orderDate: "2024-01-15",
      totalAmount: "₱1,250",
      type: "reservation"
    },
    { 
      id: 2,
      customerName: "Michael Santos",
      customerPhone: "+63 923 456 7890",
      customerAddress: "456 Oak Ave, Makati City, Metro Manila",
      productName: "Circuit Breaker",
      quantity: 2,
      unit: "pcs",
      status: "Reserved",
      orderDate: "2024-01-14",
      totalAmount: "₱3,800",
      type: "reservation"
    },
    { 
      id: 3,
      customerName: "Maria Garcia",
      customerPhone: "+63 934 567 8901",
      customerAddress: "789 Pine Rd, Taguig City, Metro Manila",
      productName: "Electrical Tape",
      quantity: 10,
      unit: "pcs",
      status: "Ready",
      orderDate: "2024-01-13",
      totalAmount: "₱450",
      type: "reservation"
    },
    { 
      id: 4,
      customerName: "Robert Cruz",
      customerPhone: "+63 945 678 9012",
      customerAddress: "321 Elm St, Pasig City, Metro Manila",
      productName: "Pliers",
      quantity: 3,
      unit: "pcs",
      status: "Completed",
      orderDate: "2024-01-12",
      totalAmount: "₱1,200",
      type: "reservation"
    },
    { 
      id: 5,
      customerName: "Jennifer Lee",
      customerPhone: "+63 956 789 0123",
      customerAddress: "567 Maple Dr, Mandaluyong City, Metro Manila",
      productName: "Wire Strippers",
      quantity: 1,
      unit: "set",
      status: "Cancelled",
      orderDate: "2024-01-11",
      totalAmount: "₱850",
      type: "reservation"
    },
    
    // Customer Orders (type: 'order')
    { 
      id: 6,
      customerName: "David Kim",
      customerPhone: "+63 967 890 1234",
      customerAddress: "890 Cedar St, Paranaque City, Metro Manila",
      productName: "Power Drill",
      quantity: 1,
      unit: "pcs",
      status: "Pending",
      orderDate: "2024-01-16",
      totalAmount: "₱4,500",
      type: "order"
    },
    { 
      id: 7,
      customerName: "Lisa Rodriguez",
      customerPhone: "+63 978 901 2345",
      customerAddress: "234 Birch Ave, Las Pinas City, Metro Manila",
      productName: "Hammer Set",
      quantity: 2,
      unit: "set",
      status: "Reserved",
      orderDate: "2024-01-15",
      totalAmount: "₱2,800",
      type: "order"
    },
    { 
      id: 8,
      customerName: "Carlos Mendoza",
      customerPhone: "+63 989 012 3456",
      customerAddress: "345 Spruce Rd, Muntinlupa City, Metro Manila",
      productName: "Screwdriver Kit",
      quantity: 3,
      unit: "kit",
      status: "Ready",
      orderDate: "2024-01-14",
      totalAmount: "₱1,950",
      type: "order"
    },
    { 
      id: 9,
      customerName: "Anna Thompson",
      customerPhone: "+63 990 123 4567",
      customerAddress: "678 Willow St, Caloocan City, Metro Manila",
      productName: "Extension Cord",
      quantity: 5,
      unit: "pcs",
      status: "Completed",
      orderDate: "2024-01-13",
      totalAmount: "₱3,250",
      type: "order"
    },
    { 
      id: 10,
      customerName: "James Park",
      customerPhone: "+63 901 234 5678",
      customerAddress: "901 Ash Blvd, Malabon City, Metro Manila",
      productName: "Safety Goggles",
      quantity: 4,
      unit: "pcs",
      status: "Cancelled",
      orderDate: "2024-01-12",
      totalAmount: "₱1,600",
      type: "order"
    }
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

  const getReservationStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const reservations = orders.filter(order => order.type === 'reservation' || !order.type);
    
    return {
      totalReservations: reservations.length,
      activeReservations: reservations.filter(reservation => 
        reservation.status === "Pending" || reservation.status === "Reserved" || reservation.status === "Ready"
      ).length,
      pendingReservations: reservations.filter(reservation => 
        reservation.status === "Pending"
      ).length,
      todayRevenue: reservations
        .filter(reservation => reservation.orderDate === today)
        .reduce((sum, reservation) => {
          const amount = parseFloat(reservation.totalAmount.replace('₱', '').replace(',', ''));
          return sum + amount;
        }, 0),
      completedReservations: reservations.filter(reservation => reservation.status === "Completed").length,
      cancelledReservations: reservations.filter(reservation => reservation.status === "Cancelled").length,
      statusBreakdown: {
        pending: reservations.filter(reservation => reservation.status === "Pending").length,
        reserved: reservations.filter(reservation => reservation.status === "Reserved").length,
        ready: reservations.filter(reservation => reservation.status === "Ready").length,
        completed: reservations.filter(reservation => reservation.status === "Completed").length,
        cancelled: reservations.filter(reservation => reservation.status === "Cancelled").length
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
    getReservationStats,
    getTodayOrders,
    getRecentOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
