import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import MobileOrder from './pages/mobileOrder';
import POS from './pages/POS';
import SalesReport from './pages/salesReport';
import CashierSales from './pages/cashiersales';
import Login from './pages/Login'; // <-- Import the login page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* <-- Login page as root */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/mobile-order" element={<MobileOrder />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/salesReport" element={<SalesReport />} />
        <Route path="/sales" element={<CashierSales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
