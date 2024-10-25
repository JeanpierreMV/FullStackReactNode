import React from 'react';
import '../styles/ViewDetailsBill.css';

const DetalleFacturacion = () => {
  return (
    <div className="invoice-container">
    <div className="invoice-header">
      <h1>Factura</h1>
      <div className="invoice-meta fundo">
        <p><strong>Factura #:</strong> INV-2024-001</p>
        <p><strong>Fecha de Emisión:</strong> 2024-03-15</p>
        <p><strong>Fecha de Vencimiento:</strong> 2024-04-15</p>
      </div>
    </div>
    <h1>Información del Cliente</h1>
    <div className="invoice-client">
      <p><strong>Nombre:</strong> Juan Pérez</p>
      <p><strong>Email:</strong> juan.perez@example.com</p>
    </div>
  
    <div className="invoice-items">
      <table>
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
            <td>$1,000.00</td>
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
  
    <div className="invoice-summary">
      <div className="summary-row">
        <span>Subtotal:</span><span>$1,500.00</span>
      </div>
      <div className="summary-row">
        <span>Impuestos (18%):</span><span>$270.00</span>
      </div>
      <div className="summary-row total">
        <span>Total a pagar:</span><span>$1,770.00</span>
      </div>
    </div>
  </div>
  
  );
};

export default DetalleFacturacion;
