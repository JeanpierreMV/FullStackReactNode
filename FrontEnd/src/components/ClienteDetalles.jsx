// src/components/ClienteDetalles.jsx
import React from 'react';

const ClienteDetalles = ({ cliente }) => {
  if (!cliente) return <p>No hay detalles disponibles.</p>;

  return (
    <div>
      <h2>Detalles del Cliente</h2>
      <p><strong>Nombre:</strong> {cliente.nombre}</p>
      <p><strong>Apellido:</strong> {cliente.apellido}</p>
      <p><strong>DNI:</strong> {cliente.dni}</p>
      <p><strong>Celular:</strong> {cliente.celular}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}</p>
      <p><strong>Fecha de Registro:</strong> {new Date(cliente.fechaRegistro).toLocaleString()}</p>
    </div>
  );
};

export default ClienteDetalles;
