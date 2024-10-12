import React from 'react';

const ListarBoletas = ({ boletas }) => {
  return (
    <div>
      <h2>Facturación del Día</h2>
      {boletas.length === 0 ? (
        <p>No se han generado boletas hoy.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Boleta ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map(boleta => (
              <tr key={boleta.id}>
                <td>{boleta.codigo}</td>
                <td>{boleta.cliente.nombre}</td>
                <td>{new Date(boleta.fecha).toLocaleDateString()}</td>
                <td>{boleta.total}</td>
                <td>
                  {boleta.detallesBoleta.map(detalle => (
                    <p key={detalle.id}>
                      {detalle.servicio.nombre} - {detalle.cantidad} x {detalle.costo}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarBoletas;
