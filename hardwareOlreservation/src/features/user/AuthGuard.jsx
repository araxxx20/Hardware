import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AuthGuard() {
  const location = useLocation();
  let isLoggedIn = false;
  try {
    const raw = sessionStorage.getItem('user');
    isLoggedIn = !!raw && JSON.parse(raw)?.email;
  } catch (_) {
    isLoggedIn = false;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default AuthGuard;


