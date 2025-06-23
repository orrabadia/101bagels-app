import {Route, Routes} from 'react-router-dom'
import React from 'react'
import Landing from './pages/Landing/Landing'
import ItemPage from './pages/Items/ItemPage';

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/search/:searchTerm" element={<Landing />} />
    <Route path="/tag/:tag" element={<Landing />} />
    <Route path="/item/:id" element={<ItemPage />} />
  </Routes>;
}
