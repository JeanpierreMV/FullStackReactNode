import React from 'react';
import Sidebar from '../components/SideBar'; // Importamos el Sidebar
import Navbar from '../components/Navbar'; // Importamos el Navbar
import '../styles/BillingSummary.css'

const BillingSummary = () => {
  // Datos locales simulados
  const factura = {
    numero: '2024-0001',
    medico: 'Jhanpierre Moreno Garcia',
    fecha: '16/04/2024',
    cliente: 'Estefani Agarra Cuentas',
    mascota: 'Chispitas',
    servicio: 'Baño y Corte',
    precioUnitario: 'S/. 32.00',
    cantidad: 1,
    metodoPago: 'Tarjeta',
    total: 'S/. 32.00'
  };

  return (
    <div className="container min-h-screen bg-gray-100 p-6">
    <Sidebar /> {/* Sidebar a la izquierda */}
    <div className="mainContent bg-white shadow-lg rounded-lg p-6">
      <Navbar /> {/* Navbar arriba */}
  
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cuadre del Día</h1>
  
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h2 className="text-center text-xl font-semibold border-b-2 pb-4 mb-6 text-gray-700">
            Ver Facturación
          </h2>
  
          <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Número de Factura:</span>
              <span className="text-blue-600">{factura.numero}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Descripción del Servicio:</span>
              <span className="text-blue-600">{factura.servicio}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Médico Veterinario:</span>
              <span className="text-blue-600">{factura.medico}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Precio Unitario:</span>
              <span className="text-gray-800">{factura.precioUnitario}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Fecha:</span>
              <span className="text-gray-800">{factura.fecha}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Cantidad:</span>
              <span className="text-gray-800">{factura.cantidad}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Cliente:</span>
              <span className="text-gray-800">{factura.cliente}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Método de Pago:</span>
              <span className="text-gray-800">{factura.metodoPago}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Mascota:</span>
              <span className="text-blue-600">{factura.mascota}</span>
            </div>
  
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Total:</span>
              <span className="text-blue-600 font-bold">{factura.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );  
};
export default BillingSummary;