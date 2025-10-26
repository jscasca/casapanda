import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes'; // Ya contiene BrowserRouter
import './index.css'; // Estilos globales y container-xl

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);