import React from 'react';

const AtencionList = ({ atenciones }) => {
  // Si la lista de atenciones aún no se ha cargado (por ejemplo, si es undefined o null), muestra el mensaje de carga
  if (!atenciones) {
    return <div>Cargando detalles de la atención...</div>;
  }

  return (
    <div>
      <h2>Atenciones de la Mascota</h2>
      {atenciones.length > 0 ? (
        <ul>
          {atenciones.map((atencion) => (
            <li key={atencion.id}>
              <p><strong>DNI:</strong> {atencion.cliente.dni}</p>
              <p><strong>Dueño:</strong> {atencion.cliente.nombre}</p>
              <p><strong>Nombre-Mascota:</strong> {atencion.mascota.nombre}</p>
              <p><strong>Veterinario:</strong> {atencion.veterinario.nombre}</p>
              <p><strong>Fecha de Cita:</strong> {new Date(atencion.fechaCita).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay atenciones registradas.</p>
      )}
    </div>
  );
};

export default AtencionList;

