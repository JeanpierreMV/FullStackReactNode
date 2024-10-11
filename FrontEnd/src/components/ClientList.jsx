// components/ClientList.js
import React from 'react';
import DeleteClient from './DeleteClient';
import EditClient from './EditClient';

const ClientList = ({ clientes, onClientUpdated, onClientDeleted }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Celular</th>
          <th>Rol</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.codigo}>
            <td>{cliente.dni}</td>
            <td>{cliente.nombres} {cliente.apellidos}</td>
            <td>{cliente.email}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.rol}</td>
            <td>
              <EditClient cliente={cliente} onClientUpdated={onClientUpdated} />
              <DeleteClient cliente={cliente} onClientDeleted={onClientDeleted} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;
