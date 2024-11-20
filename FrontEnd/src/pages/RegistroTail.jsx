import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import ListaClientes from '../components/ListaTail';
import FormularioRegistro from '../components/ClienteTail';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', dni: '12345678', email: 'juan@mail.com', celular: '987654321', direccion: 'Calle Falsa 123', distrito: 'Lima' },
    { id: 2, nombre: 'Ana García', dni: '87654321', email: 'ana@mail.com', celular: '987654322', direccion: 'Av. Siempre Viva 456', distrito: 'Surco' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleRegistrarClick = () => {
    setClienteEditando(null); // Reset clienteEditando when adding a new client
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setClienteEditando(null); // Reset clienteEditando when closing the modal
  };

  const handleGuardarCliente = (nuevoCliente) => {
    if (clienteEditando) {
      // Update existing client
      setClientes(clientes.map(cliente => cliente.dni === clienteEditando.dni ? nuevoCliente : cliente));
    } else {
      // Add new client with a unique ID
      const clienteConId = { ...nuevoCliente, id: clientes.length + 1 };
      setClientes([...clientes, clienteConId]);
    }
    setShowModal(false);
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente); // Set the client to be edited
    setShowModal(true);
  };

  const handleDelete = (dni) => {
    // Delete client by DNI
    setClientes(clientes.filter(cliente => cliente.dni !== dni));
  };

  return (
    <div className="page-container flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="content flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="bg-white shadow z-10 mb-6">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Clientes Registrados</h1>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="cliente-list">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ListaClientes
                  clientes={clientes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>

            <button
              className="register-btn bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none mt-6"
              onClick={handleRegistrarClick}
            >
              Registrar Nuevo Cliente
            </button>
          </main>
        </div>
      </div>

      {/* Modal for registration/edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {clienteEditando ? "Editar Cliente" : "Registrar Nuevo Cliente"}
              </h3>
              <div className="mt-2 px-7 py-3">
                <FormularioRegistro
                  cliente={clienteEditando}
                  onClose={handleModalClose}
                  onGuardarCliente={handleGuardarCliente}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;
