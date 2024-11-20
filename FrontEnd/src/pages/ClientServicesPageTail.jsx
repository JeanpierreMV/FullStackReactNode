import React from 'react';
import Navbar from '../components/SideBar';  // Asegúrate de ajustar el path al componente Navbar
import ClientServiceList from '../components/ClientServiceTail';  // Ajusta el path

const ClientServicesPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <h1>Servicios Disponibles</h1>
        <ClientServiceList />
      </div>
    </div>
  );
};

export default ClientServicesPage;
