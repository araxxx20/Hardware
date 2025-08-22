import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import HomePage from './HomePage.jsx';
import ReservationsPage from './ReservationsPage.jsx';
import ReservationSummaryPage from './ReservationSummaryPage.jsx';
import ReservationReceiptPage from './ReservationReceiptPage.jsx';
import ProductDetailPage from './ProductDetailPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import AuthGuard from './AuthGuard.jsx';
import CartPage from './CartPage.jsx';
import CheckoutPage from './CheckoutPage.jsx';

function UserRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route element={<Layout />}>
        <Route element={<AuthGuard />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="orders" element={<ReservationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="reservation/summary" element={<ReservationSummaryPage />} />
          <Route path="reservation/receipt" element={<ReservationReceiptPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;


