import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import Users from './pages/users';
import CustomerOrders from './pages/customerOrders';
import POS from './pages/POS';
import SalesReport from './pages/salesReport';
import CashierSales from './pages/cashiersales';
import CashierReservations from './pages/cashierReservations';
import Login from './pages/Login'; // <-- Import the login page

function App() {
  return (
    <InventoryProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} /> {/* <-- Login page as root */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/customer-orders" element={<CustomerOrders />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/salesReport" element={<SalesReport />} />
            <Route path="/sales" element={<CashierSales />} />
            <Route path="/cashier-reservations" element={<CashierReservations />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </InventoryProvider>
  );
}

export default App;
