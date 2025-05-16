import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.png';
import admin from '../assets/admin1.png';
import notif from '../assets/notif.png';
import './navbarcashier.css';

const NavbarCashier = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { to: "/pos", icon: "fas fa-tachometer-alt", label: "POS" },
   
    { to: "/sales", icon: "fas fa-cash-register", label: "Sales" }, // add POS link
  ];

  return (
    <div className="min-h-screen flex flex-col" data-theme="autumn">
      {/* Top Navbar */}
      <header className="navbar flex justify-between items-center p-2 text-white custom-header sticky top-0 z-10">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-15 ml-5" />
          <span className="text-lg font-bold h-8 w-15 ps-2">Hardware</span>
        </div>

        <div className="flex items-center mt-2 md:mt-0">
          <img src={notif} alt="notif" className="h-10 w-10 mr-2" />
          <span className="text-lg font-bold text-yellow-100 mr-20 ps-2">7:30 AM</span>
          <img src={admin} alt="admin" className="h-10 w-10 mr-2" />
          <span className="text-lg font-bold mr-20 ps-2 cursor-pointer">Log Out</span>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="sidebar w-64 h-screen text-white sticky top-0 hidden md:block">
          <div className="p-4">
            <ul className="mt-3 pl-0 text-lg">
              {menuItems.map(({ to, icon, label }) => (
                <li key={to} className="mb-2">
                  <Link
                    to={to}
                    className={`block p-2 rounded hover:bg-error flex items-center ${
                      location.pathname === to ? "bg-error" : ""
                    }`}
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
