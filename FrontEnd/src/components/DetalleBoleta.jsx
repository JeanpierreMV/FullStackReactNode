import React from 'react';

const DetalleBoleta = ({ boleta }) => {
  if (!boleta) {
    return <p>No se encontraron detalles de la boleta</p>;
  }

  return (
    <div>
      <h2>Detalle de la Boleta - {boleta.codigo}</h2>
      <p>Cliente: {boleta.cliente.nombre}</p>
      <p>Fecha: {new Date(boleta.fecha).toLocaleDateString()}</p>
      <p>Total: {boleta.total}</p>

      <h3>Servicios:</h3>
      <ul>
        {boleta.detallesBoleta.map((detalle, index) => (
          <li key={index}>
            <p>Servicio: {detalle.servicio.nombre}</p>
            <p>Cantidad: {detalle.cantidad}</p>
            <p>Costo: {detalle.costo}</p>
            <p>Descripción: {detalle.servicio.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleBoleta;
