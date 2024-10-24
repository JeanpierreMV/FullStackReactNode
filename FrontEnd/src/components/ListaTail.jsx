import React from 'react';

const ListaClientes = ({ clientes, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Clientes Registrados</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">DNI</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Celular</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Distrito</th>
            <th className="px-4 py-2">Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.dni}>
              <td className="border px-4 py-2">{cliente.nombre} {cliente.apellido}</td>
              <td className="border px-4 py-2">{cliente.dni}</td>
              <td className="border px-4 py-2">{cliente.email}</td>
              <td className="border px-4 py-2">{cliente.celular}</td>
              <td className="border px-4 py-2">{cliente.direccion}</td>
              <td className="border px-4 py-2">{cliente.distrito}</td>
              <td className="border px-4 py-2">
                <button 
                  className="text-blue-500 hover:underline mx-2" 
                  onClick={() => onEdit(cliente)}
                >
                  Editar
                </button>
                <button 
                  className="text-red-500 hover:underline" 
                  onClick={() => onDelete(cliente.dni)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
