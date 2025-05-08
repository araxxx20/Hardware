import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import POS from './POS'; // make sure POS.jsx is in /src/

function App() {
  return (
    <div>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/pos">POS</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </div>
  );
}

export default App;
