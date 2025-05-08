import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/pos')}>Go to POS</button>
    </div>
  );
}
