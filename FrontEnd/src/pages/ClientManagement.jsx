// pages/ClientManagement.js
import React, { useState } from 'react';
import RegisterClient from '../components/RegisterClient';
import ClientList from '../components/ClientList';
import Navbar from '../components/Navbar';  // Importar el Navbar
import Sidebar from '../components/Sidebar';  // Importar el Sidebar
import '../styles/ClientManagement.css';  // Importar estilos

const ClientManagement = () => {
  const [clientes, setClientes] = useState([]);

  const handleClientAdded = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleClientUpdated = (updatedClient) => {
    setClientes(
      clientes.map((cliente) =>
        cliente.codigo === updatedClient.codigo ? updatedClient : cliente
      )
    );
  };

  const handleClientDeleted = (codigo) => {
    setClientes(clientes.filter((cliente) => cliente.codigo !== codigo));
  };

  return (
    <div className="layout">

      <div className="main-content">
        <Sidebar />  {/* Sidebar en la parte izquierda */}
        <div className="content">
          <h1>Gestión de Clientes</h1>
          <RegisterClient onClientAdded={handleClientAdded} />
          <ClientList
            clientes={clientes}
            onClientUpdated={handleClientUpdated}
            onClientDeleted={handleClientDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
