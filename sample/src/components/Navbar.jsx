import React from "react";
import "../Sales.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🔌 BABA</div>
      <div className="right-section">
        <span className="icon">🔔</span>
        <span className="time">7:48am</span>
        <button className="logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
