import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import MobileOrder from './pages/mobileOrder';
import POS from './pages/POS';
import SalesReport from './pages/salesreport'; // <-- Make sure this exists

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/mobile-order" element={<MobileOrder />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/salesreport" element={<SalesReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
