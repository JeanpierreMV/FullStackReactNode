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
  const [clienteEditando, setClienteEditando] = useState(null); // Para manejar el cliente que se está editando

  const handleRegistrarClick = () => {
    setClienteEditando(null); // Reiniciar el cliente que se está editando
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setClienteEditando(null); // Reiniciar el cliente al cerrar el modal
  };

  const handleGuardarCliente = (nuevoCliente) => {
    if (clienteEditando) {
      // Editar cliente existente
      setClientes(clientes.map(cliente => cliente.dni === clienteEditando.dni ? nuevoCliente : cliente));
    } else {
      // Registrar nuevo cliente
      const clienteConId = { ...nuevoCliente, id: clientes.length + 1 };
      setClientes([...clientes, clienteConId]);
    }
    setShowModal(false);
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setShowModal(true);
  };

  const handleDelete = (dni) => {
    setClientes(clientes.filter(cliente => cliente.dni !== dni));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido a la derecha del Sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow z-10">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Título y Botón de Registrar Cliente */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Lista de Clientes</h2>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRegistrarClick}
              >
                Registrar Cliente
              </button>
            </div>

            {/* Lista de Clientes */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <ListaClientes 
                clientes={clientes} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modal para registro de cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{clienteEditando ? "Editar Cliente" : "Registrar Nuevo Cliente"}</h3>
              <div className="mt-2 px-7 py-3">
                <FormularioRegistro
                  cliente={clienteEditando} // Pasar el cliente a editar si existe
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
