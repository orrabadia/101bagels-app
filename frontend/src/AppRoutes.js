import {Route, Routes} from 'react-router-dom'
import React from 'react'
import Menu from './pages/Menu/Menu'
import ItemPage from './pages/Items/ItemPage';
import Landing from './pages/Landing/Landing';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/menu/search/:searchTerm" element={<Menu />} />
    <Route path="/menu/tag/:tag" element={<Menu />} />
    <Route path="/menu/item/:id" element={<ItemPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage/>} />
  </Routes>;
}
