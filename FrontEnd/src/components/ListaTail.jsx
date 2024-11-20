import React from 'react';
import '../styles/ListaClientes.css'; // Importa el archivo CSS

const ListaClientes = ({ clientes, onEdit, onDelete }) => {
  return (
    <div className="cliente-list">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Dirección</th>
            <th>Distrito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.email}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.distrito}</td>
              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => onEdit(cliente)} // Pasamos el cliente a editar
                >
                  Editar
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(cliente.dni)} // Eliminamos el cliente por DNI
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
