import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';
import RegisterTipoMascota from './pages/RegisterTipoMascota';
import RegisterMascota from './pages/RegisterMascota'; // Importa la nueva página
import RegisterEmployee from './pages/RegisterEmployee';
//import RegisterAtencion from './pages/RegisterAtencion2.jsx';
import BuscarClientesPage from './pages/BuscarClientesPage';
import RegisterBoleta from './pages/RegisterBoleta';
import Login from './pages/Login';
import FilterMascotaPage from './pages/FilterMascotaPage';
import FilterAtencionPage from './pages/FilterAtencionPage.jsx';
import RegisterAtencionPage from './pages/RegisterAtencionPage.jsx';
import ConsultarClientePage from './pages/ConsultarClientePage.jsx';
//import RegisterAtencion from './components/RegistrarAtencion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registrar-cliente" element={<RegisterClient />} />
        <Route path="/registrar-tipo-mascota" element={<RegisterTipoMascota />} />
        <Route path="/registrar-mascota" element={<RegisterMascota />} /> {/* Añade la nueva ruta */}
        <Route path="/registrar-empleados" element={<RegisterEmployee />} />
        <Route path="/consultar-cliente" element={<ConsultarClientePage />} />
        <Route path="/buscar-clientes" element={<BuscarClientesPage />} />
        <Route path="/generar-boleta" element={<RegisterBoleta />} />
        <Route path="/filter-mascota" element={<FilterMascotaPage />} />
        <Route path="/filter-atencion" element={<FilterAtencionPage />} />
        <Route path="/registrar-atencion" element={<RegisterAtencionPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </Router>
  );
};

export default App;
