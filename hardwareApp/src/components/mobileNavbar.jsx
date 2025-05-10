import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" data-theme="autumn">
      {/* Top Navigation Bar */}
      <header className="navbar flex flex-wrap justify-between items-center p-2  text-white custom-header sticky top-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-lg font-bold">Ramen App</span>
        </div>
        {/* Account Section with Logout */}
        <div className="flex items-center mt-2 md:mt-0">
          <span className="mr-4 hidden sm:inline">Welcome, Admin</span>
          <button id="logoutButton" className="btn btn-error btn-sm">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="sidebar w-64 h-screen text-base-content custom-sidebar text-white sticky top-0 hidden md:block">
          <div className="p-4">
            {/* Menu */}
            <h2 className="text-lg font-bold">Menu</h2>
            <ul className="mt-4">
              <li className="mb-2">
                <Link to="/dashboard" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-tachometer-alt mr-2"></i> Point of Sale
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mobile-order" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-shopping-cart mr-2"></i> Mobile Order
                </Link>
              </li>
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

export default Navbar;  