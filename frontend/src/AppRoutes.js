import {Route, Routes} from 'react-router-dom'
import React from 'react'
import Menu from './pages/Menu/Menu'
import ItemPage from './pages/Items/ItemPage';
import Landing from './pages/Landing/Landing';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import PaymentPage from './pages/Payment/PaymentPage';
import CancelPage from './pages/Cancel/CancelPage';
import SuccessPage from './pages/Success/SuccessPage';


export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/menu/search/:searchTerm" element={<Menu />} />
    <Route path="/menu/tag/:tag" element={<Menu />} />
    <Route path="/menu/item/:id" element={<ItemPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/checkout" element={<AuthRoute><CheckoutPage /></AuthRoute>} />
    <Route path="/payment" element={<AuthRoute><PaymentPage /></AuthRoute>} />
    <Route path="/cancel" element={<AuthRoute><CancelPage/></AuthRoute>} />
    <Route path="/success" element={<AuthRoute><SuccessPage /></AuthRoute>} />

  </Routes>;
}
