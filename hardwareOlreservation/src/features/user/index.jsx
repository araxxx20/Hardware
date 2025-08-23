import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import HomePage from './HomePage.jsx';
import ReservationPage from './ReservationPage.jsx';
import ReservationSummaryPage from './ReservationSummaryPage.jsx';
import ReservationReceiptPage from './ReservationReceiptPage.jsx';
import ProductDetailPage from './ProductDetailPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import AuthGuard from './AuthGuard.jsx';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route element={<Layout />}>
        <Route element={<AuthGuard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reservation/summary" element={<ReservationSummaryPage />} />
          <Route path="reservation/receipt" element={<ReservationReceiptPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;


