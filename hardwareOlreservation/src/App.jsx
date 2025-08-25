import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRoutes from './features/user/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
