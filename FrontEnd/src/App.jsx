import React from 'react';

import PrivateRoute from './services/PrivateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';
import RegisterTipoMascota from './pages/RegisterTipoMascota';
import RegisterMascota from './pages/RegisterMascota'; 
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
//import ClientManagement from './pages/ClientManagement.jsx';
// import BuscarCitaMas from './pages/SeguimientoAtencion.jsx';
import CuadreDia from './pages/Dashboard.jsx';
//import RegisterAtencion from './components/RegistrarAtencion';
import BuscarAtencionesPage from './pages/BuscarAtencionesPage';
import VerDetallesAtencionPage from './pages/VerDetallesAtencionPage';
import ListarFacturacionPage from './pages/ListarFacturacionPage';
import VerDetalleBoletaPage from './pages/VerDetalleBoletaPage';
import ViewDetailsBillPage from './pages/ViewDetailsBillPage.jsx';
import ViewDetailsAnalysis from './pages/ViewDetailsAnalysisPage.jsx';
//import RegistroTail1 from './pages/RegistroTail.jsx';
import ServiceTa from './pages/ServicePageT.jsx';
import CitaBuscarT from './pages/CitaBuscarTail.jsx';
import ConsultaServi from './pages/ClientServicesPageTail.jsx';
import GenerarBoletaPage from './pages/GenerarBoletaPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>      
      <Route path="/" element={<Login />} />
        <Route path="/registrar-cliente" element={<PrivateRoute element={<RegisterClient />} />} />
        <Route path="/service-paget" element={<PrivateRoute element={<ServiceTa />} />} />
        <Route path="/cita-buscart" element={<PrivateRoute element={<CitaBuscarT />} />} />
        <Route path="/cliente-consulta" element={<PrivateRoute element={<ConsultaServi />} />} />
        <Route path="/registrar-tipo-mascota" element={<PrivateRoute element={<RegisterTipoMascota />} />} />
        <Route path="/registrar-mascota" element={<PrivateRoute element={<RegisterMascota />} />} />
        <Route path="/registrar-empleados" element={<PrivateRoute element={<RegisterEmployee />} />} />
        <Route path="/consultar-cliente" element={<PrivateRoute element={<ConsultarClientePage />} />} />
        <Route path="/cuadre-dia" element={<PrivateRoute element={<CuadreDia />} />} />
        <Route path="/buscar-clientes" element={<PrivateRoute element={<BuscarClientesPage />} />} />
        <Route path="/generar-boleta" element={<PrivateRoute element={<RegisterBoleta />} />} />
        <Route path="/filter-mascota" element={<PrivateRoute element={<FilterMascotaPage />} />} />
        <Route path="/filter-atencion" element={<PrivateRoute element={<FilterAtencionPage />} />} />
        <Route path="/pet-attetion" element={<PrivateRoute element={<PetAttentionSearchPage />} />} />
        <Route path="/buscar-servicios" element={<PrivateRoute element={<BuscarServicios />} />} />
        <Route path="/registrar-atencion" element={<PrivateRoute element={<RegisterAtencionPage />} />} />
        <Route path="/seguimiento-atencion" element={<PrivateRoute element={<SeguimientoAtencionPage />} />} />
        <Route path="/buscar-atencion/:mascotaId" element={<PrivateRoute element={<BuscarAtencionesPage />} />} />
        <Route path="/detalles-atencion/:atencionId" element={<PrivateRoute element={<VerDetallesAtencionPage />} />} />
        <Route path="/facturacion-dia" element={<PrivateRoute element={<ListarFacturacionPage />} />} />
        <Route path="/boleta/detalle/:id" element={<PrivateRoute element={<VerDetalleBoletaPage />} />} />
        <Route path="/ver-factura" element={<PrivateRoute element={<ViewDetailsBillPage />} />} />
        <Route path="/ultimo-analisis" element={<PrivateRoute element={<ViewDetailsAnalysis />} />} />
        
      </Routes>

    </Router>
  );
};

export default App;

//<Route path="/generar-boleta" element={<PrivateRoute element={<RegisterBoleta />} />} />