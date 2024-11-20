import React from 'react';

const ListarFacturas = ({ facturas }) => {
  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const año = date.getFullYear(); // Año
    return `${dia}/${mes}/${año}`;
  };

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
                <td>{formatFecha(factura.fecha)}</td> {/* Formateo de la fecha */}
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
