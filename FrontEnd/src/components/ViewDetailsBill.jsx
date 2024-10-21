import React from 'react';
import '../styles/ViewDetailsBill.css';

const DetalleFacturacion = () => {
  return (
    <div className="invoice-wrapper">
      {/* Contenedor con el color de fondo original */}
      <div className="invoice-header">
        <h2 className="invoice-title">Detalle de Facturación</h2>
        <p className="invoice-number">Factura #INV-2024-001</p>
      </div>

      {/* Contenedor con fondo blanco */}
      <div className="invoice-body">
        {/* Fecha de Emisión y Fecha de Vencimiento */}
        <div className="invoice-dates">
          <div>
            <p className="invoice-label">Fecha de Emisión</p>
            <p className="invoice-value">2024-03-15</p>
          </div>
          <div>
            <p className="invoice-label">Fecha de Vencimiento</p>
            <p className="invoice-value">2024-04-15</p>
          </div>
        </div>

        {/* Información del Cliente */}
        <div className="invoice-client">
        <h3 className="invoice-label Cliente">Cliente</h3>
        </div>
        <p className="invoice-value">Juan Pérez</p>
        <p className="invoice-value">juan.perez@example.com</p>
        {/* Detalle de Items */}
        <div className="invoice-items">
          <p className="invoice-label">Detalle de Items</p>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Servicio de consultoría</td>
                <td>10</td>
                <td>$100.00</td>
                <td>$1000.00</td>
              </tr>
              <tr>
                <td>Licencia de software</td>
                <td>1</td>
                <td>$500.00</td>
                <td>$500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resumen de Precios */}
        <div className="invoice-summary">
          <div className="summary-row">
            <p>Subtotal:</p>
            <p>$1500.00</p>
          </div>
          <div className="summary-row">
            <p>Impuestos:</p>
            <p>$270.00</p>
          </div>
          <div className="summary-row total">
            <p>Total:</p>
            <p>$1770.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleFacturacion;
