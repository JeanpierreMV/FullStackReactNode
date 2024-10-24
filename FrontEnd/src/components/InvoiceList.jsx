import React from 'react';
import '../styles/InvoiceList.css';

const InvoiceList = ({ invoices }) => {
  return (
    <div className="invoice-list-container">
      <h2 className="section-title">CUADRE DEL DÍA</h2>
      <div className="invoice-table-wrapper">
        <h3 className="table-title">Lista Facturación del Día</h3>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Número de factura</th>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.service}</td>
                  <td>{invoice.total}</td>
                  <td><button className="detail-button">Detalle</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No hay facturas disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
