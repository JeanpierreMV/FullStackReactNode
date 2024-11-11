import React from 'react';


const ListarFacturas = ({ facturas }) => {
  return (
    <div>
      <h1>Facturación del Día</h1>
      {facturas.length === 0 ? (
        <p>No se han generado facturas hoy.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número de Factura</th>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td>{factura.codigo}</td>
                <td>{new Date(factura.fecha).toLocaleDateString()}</td>
                <td>
                  {factura.detallesBoleta.map((detalle) => (
                    <div key={detalle.id}>{detalle.descripcion}</div>
                  ))}
                </td>
                <td>{factura.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarFacturas;
