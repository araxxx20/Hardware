import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/logo1.png';
import admin from '../assets/Admin1.png';
import notif from '../assets/notif.png';
import './navbarcashier.css';
import CashierSales from '../pages/cashiersales'

const NavbarCashier = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); 

  const menuItems = [
    { to: "/pos", icon: "fas fa-tachometer-alt", label: "POS" },
    { to: "/sales", icon: "fas fa-cash-register", label: "Sales" },
  ];

const [currentTime, setCurrentTime] = useState(new Date());
const handleLogout = () => {
    navigate('/'); 
  };
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000); 

  return () => clearInterval(interval); 
}, []);

const formattedTime = currentTime.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});


  return (
    <div className="min-h-screen flex flex-col" data-theme="autumn">
      {/* Top Navbar */}
      <header className="navbar flex justify-between items-center p-3 text-white custom-header sticky top-0 z-20">
        <div className="flex items-center gap-2">
          {/* Hamburger button on mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>

          <img src={logo} alt="Logo" className="h-8 w-8 ml-2" />
          <span className="text-lg font-bold ps-2">Hardware</span>
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-2 text-sm sm:text-base">
          <img src={notif} alt="notif" className="h-8 w-8" />
          <span className="font-semibold text-yellow-100">{formattedTime}</span>
          <img src={admin} alt="admin" className="h-8 w-8" />
<span onClick={handleLogout} className="font-semibold cursor-pointer hover:underline">
            Log Out
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Mobile + Desktop) */}
        <nav
  className={`sidebar bg-[#2a313b] w-64 z-30 transform transition-transform duration-300 ease-in-out
    fixed top-16 bottom-0 md:static md:top-0 md:bottom-auto
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
>

          <div className="p-4">
            <ul className="mt-3 text-lg">
              {menuItems.map(({ to, icon, label }) => (
                <li key={to} className="mb-2">
                  <Link
                    to={to}
                    className={`block p-2 rounded hover:bg-error flex items-center ${
                      location.pathname === to ? "bg-error" : ""
                    }`}
                    onClick={() => setIsSidebarOpen(false)} // Close on mobile
                  >
                    <i className={`${icon} mr-2`}></i> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavbarCashier;
