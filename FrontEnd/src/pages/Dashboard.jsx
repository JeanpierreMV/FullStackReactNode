import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import InvoiceList from '../components/InvoiceList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  // Simulación de llamada a la API
  useEffect(() => {
    // Aquí deberías reemplazar con una llamada real a la API
    fetch('/api/invoices') // ejemplo de ruta de API
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <InvoiceList invoices={invoices} />
      </div>
    </div>
  );
};

export default Dashboard;
