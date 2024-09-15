import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';
import RegisterTipoMascota from './pages/RegisterTipoMascota';
import RegisterMascota from './pages/RegisterMascota'; // Importa la nueva página

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registrar-cliente" element={<RegisterClient />} />
        <Route path="/registrar-tipo-mascota" element={<RegisterTipoMascota />} />
        <Route path="/registrar-mascota" element={<RegisterMascota />} /> {/* Añade la nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
