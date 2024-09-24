import React from 'react';
import { PawPrint } from 'lucide-react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';
import RegisterTipoMascota from './pages/RegisterTipoMascota';
import RegisterMascota from './pages/RegisterMascota'; // Importa la nueva página
import Loginxx from './pages/Loginxx';
import RegisterEmployee from './pages/RegisterEmployee';
import RegisterAtencion from './pages/RegisterAtencion';
import BuscarClientesPage from './pages/BuscarClientesPage';
import RegisterBoleta from './pages/RegisterBoleta';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registrar-cliente" element={<RegisterClient />} />
        <Route path="/registrar-tipo-mascota" element={<RegisterTipoMascota />} />
        <Route path="/registrar-mascota" element={<RegisterMascota />} /> {/* Añade la nueva ruta */}
        <Route path="/loginxx" element={<Loginxx />} /> {/* Añade la nueva ruta */}
        <Route path="/register-empleados" element={<RegisterEmployee />} />
        <Route path="/registrar-atencion" element={<RegisterAtencion />} />      
        <Route path="/buscar-clientes" element={<BuscarClientesPage />} />
        <Route path="/generar-boleta" element={<RegisterBoleta />} />
      </Routes>
    </Router>
  );
};

export default App;
