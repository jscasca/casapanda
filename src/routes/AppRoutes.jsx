// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Properties from '../pages/Properties';
import Resultados from '../pages/Resultados';
import LoginUser from '../pages/LoginUser'; // Ruta de clientes
import PropertyDetail from '../pages/PropertyDetail'; // NUEVO: Importación de PropertyDetail

// Placeholder pages para rutas nuevas
const Vende = () => <div>Formulario de venta (pendiente)</div>;
const Blog = () => <div>Blog (Consejos | Historias | Noticias)</div>;
const Registro = () => <div>Formulario de registro (pendiente)</div>;
const Login = () => <div>Iniciar sesión (pendiente)</div>;
const Zona = () => <div>Página de zona por alcaldía (pendiente)</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/property/:id" element={<PropertyDetail />} /> {/* <-- Nueva ruta */}
        <Route path="/vende" element={<Vende />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/zona/:alcaldia" element={<Zona />} />
        <Route path="*" element={<div>404: Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;