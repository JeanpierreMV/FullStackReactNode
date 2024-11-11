import React, { useState, useEffect } from 'react';
import { buscarCitas } from '../services/api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  // Cargar el userId del cliente desde localStorage
  
  const clienteId = localStorage.getItem('userId');

  // Obtener citas cuando se carga el componente
  useEffect(() => {
    const cargarCitas = async () => {
      if (!clienteId) {
        console.error("No se encontró el userId en el localStorage.");
        return;
      }
      
      try {
        const citas = await buscarCitas(clienteId); // Asume que `buscarCitas` toma solo el clienteId
        setAppointments(citas);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    cargarCitas();
  }, [clienteId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Tus Atenciones</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Dueño</th>
            <th className="px-4 py-2 text-left">Nombre Mascota</th>
            <th className="px-4 py-2 text-left">Servicio</th>
            <th className="px-4 py-2 text-left">Fecha Cita</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-t">
            <td className="px-4 py-2">{appt.cliente.dni}</td>
            <td className="px-4 py-2">{appt.cliente.nombre}</td>
            <td className="px-4 py-2">{appt.mascota.nombre}</td>
            <td className="px-4 py-2">{appt.servicio.nombre}</td>
            <td className="px-4 py-2">{new Date(appt.fechaCita).toLocaleString()}</td>
            <td className="px-4 py-2">{appt.consideraciones}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
