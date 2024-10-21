import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';
import RegisterTipoMascota from './pages/RegisterTipoMascota';
import RegisterMascota from './pages/RegisterMascota'; // Importa la nueva página
import RegisterEmployee from './pages/RegisterEmployee';
//import RegisterAtencion from './pages/RegisterAtencion2.jsx';
import SeguimientoAtencionPage from './pages/SeguimientoAtencionPage.jsx';
import BuscarClientesPage from './pages/BuscarClientesPage';
import RegisterBoleta from './pages/RegisterBoleta';
import Login from './pages/Login';
import FilterMascotaPage from './pages/FilterMascotaPage';
import FilterAtencionPage from './pages/FilterAtencionPage.jsx';
import RegisterAtencionPage from './pages/RegisterAtencionPage.jsx';
import ConsultarClientePage from './pages/ConsultarClientePage.jsx';
import PetAttentionSearchPage from './pages/PetAttentionSearchPage.jsx';
import BuscarServicios from './pages/BuscarServiciosPage.jsx';
import ClientManagement from './pages/ClientManagement.jsx';
// import BuscarCitaMas from './pages/SeguimientoAtencion.jsx';
import CuadreDia from './pages/Dashboard.jsx';
//import RegisterAtencion from './components/RegistrarAtencion';
import BuscarAtencionesPage from './pages/BuscarAtencionesPage';
import VerDetallesAtencionPage from './pages/VerDetallesAtencionPage';
import ListarFacturacionPage from './pages/ListarFacturacionPage';
import VerDetalleBoletaPage from './pages/VerDetalleBoletaPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/registrar-cliente" element={<RegisterClient />} />
        <Route path="/registrar-tipo-mascota" element={<RegisterTipoMascota />} />
        <Route path="/registrar-mascota" element={<RegisterMascota />} /> {/* Añade la nueva ruta */}
        <Route path="/registrar-empleados" element={<RegisterEmployee />} />
        <Route path="/consultar-cliente" element={<ConsultarClientePage />} />
        <Route path="/cuadre-dia" element={<CuadreDia/>} />
        {/* <Route path="/buscar-citas" element={<BuscarCitaMas/>} /> */}
        <Route path="/buscar-clientes" element={<BuscarClientesPage />} />
        {/* <Route path="/client-manager" element={<ClientManagement />} /> */}
        <Route path="/generar-boleta" element={<RegisterBoleta />} />
        <Route path="/filter-mascota" element={<FilterMascotaPage />} />
        <Route path="/filter-atencion" element={<FilterAtencionPage />} />
        <Route path="/pet-attetion" element={<PetAttentionSearchPage />} />
        <Route path="/buscar-servicios" element={<BuscarServicios />} />
        <Route path="/registrar-atencion" element={<RegisterAtencionPage />} />
        <Route path="/seguimiento-atencion" element={<SeguimientoAtencionPage />} />
        <Route path="/buscar-atencion/:mascotaId" element={<BuscarAtencionesPage />} /> {/* Nueva ruta */}
        <Route path="/detalles-atencion/:atencionId" element={<VerDetallesAtencionPage />} />
        <Route path="/facturacion-dia" element={<ListarFacturacionPage />} />
        <Route path="/boleta/detalle/:id" element={<VerDetalleBoletaPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </Router>
  );
};

export default App;
