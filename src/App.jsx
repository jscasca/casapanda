// src/App.jsx
import React from 'react';
import AppRoutes from './Routes/AppRoutes'; // Contiene las rutas y <BrowserRouter>
import './App.css';

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;