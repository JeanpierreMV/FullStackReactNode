import React from 'react';
import Navbar from '../components/SideBar';  // Asegúrate de ajustar el path al componente Navbar
import ClientServiceList from '../components/ClientServiceTail';

const ClientServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Servicios Disponibles</h1>
        <ClientServiceList />
      </div>
    </div>
  );
};

export default ClientServicesPage;
