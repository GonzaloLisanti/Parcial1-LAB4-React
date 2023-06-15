import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Articulos from '../components/Articulos';
import DetalleArticulo from '../components/DetalleArticulo';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articulos" element={<Articulos />} />
      <Route path="/articulos/:id" element={<DetalleArticulo />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;